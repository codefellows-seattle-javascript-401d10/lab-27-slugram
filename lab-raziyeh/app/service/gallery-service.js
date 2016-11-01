'use strict';

module.exports = ['$q', '$log', '$http', 'authService', function($q, $log, $http , authService) {
  $log.debug('init gallery Service');

  let service = {};

  service.galleries = [];
  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken() 
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, gallery, config);
    })
    .then(res => {
      $log.log('successful create gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function (galleryID){ 
    $log.debug('galleryService.deleteGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain, */*',
        },
      };

      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('successful delete user galleries');
      for (let i=0; i< service.galleries.length; i++) {
        if(service.galleries[i]._id === galleryID)
          service.galleries.splice(i,1);
      }
      return;
    })
    .catch(err => {
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then(res => {
      $log.log('successful fetch user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function (galleryID, galleryData){ 
    $log.debug('galleryService.updateGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.put(url, galleryData, config);
    })
    .then( res => {
      let gallery = res.data;
      $log.log('successful update user galleries');
      for( let i=0; i< service.galleries.length; i++) {
        if(galleryID === service.galleries[i]._id) {
          service.galleries[i] = gallery;
        }
      }
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}];