'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');

  let service = {};

  service.galleries = [];

//POST function
  service.createGallery = function(gallery){
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

      return $http.post(url, gallery, config)
;
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  //delete function
  service.deleteGallery = function(galleryID){
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
      $log.log('init service.deleteGalleries()');
      for(let i= 0; i < service.galleries.length; ++i){
        let current = service.galleries[i];
        if (current._id === galleryID){
          service.galleries.splice(i, 1);
          break;
        }
      }
      return;
    })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
  };

  //GET method
  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleris()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/?sort=dsc`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('gallery fetched');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  //PUT method
  service.updateGallery = function(galleryID, galleryData){
    $log.debug('gallery-service.updateGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('lallalala', url);
      return $http.put(url, galleryData, config);
    })
    .then( res => {
      $log.log('gallery updated');
      //update the gallery in service.galleries
      for(let i = 0; i < service.galleries.length; ++i){
        let current = service.galleries[i];
        if (current._id === galleryID){
          service.galleries[i] = res.data;
          break;
        }
      }
      return $q.resolve(res.data);
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };



  return service;
}
