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
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('successful delete user galleries');
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
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

  return service;
}];