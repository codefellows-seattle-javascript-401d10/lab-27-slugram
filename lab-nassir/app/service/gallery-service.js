'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('init galleryService;');
  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('Hit galleryService.createGallery;');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.post(url, gallery, config);
    })
    .then(res => {
      $log.log('Gallery creation successful;');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.fetchGalleries = function() {
    $log.debug('Hit galleryService.fetchGalleries;');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('Gallery fetch successful;');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function(galleryID) {
    $log.debug('Hit galleryService.deleteGalleries;');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('Gallery delete successful;');
      for (var i = 0; i < service.galleries.length; ++i) {
        let current = service.galleries[i];
        if (current._id === galleryID) {
          service.galleries.splice(i, 1);
          break;
        }
      }
      return;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGalleries = function(galleryID, galleryData) {
    $log.debug('Hit galleryService.updateGalleries;');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, galleryData, config);
    })
    .then(res => {
      $log.log('Gallery update successful;');
      for (var i = 0; i < service.galleries.length; ++i) {
        let current = service.galleries[i];
        if (current._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  return service;
}
