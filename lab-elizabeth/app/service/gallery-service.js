'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then(token => {
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
      return $q.resolve(gallery);
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/?sort=dsc`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('sucessful fetch galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID){
    $log.debug('galleryService.deleteGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for(let i = 0; i < service.galleries.length; ++i){
        let currentGallery = service.galleries[i];
        if(currentGallery._id === galleryID){
          service.galleries.splice(i, 1);
          break;
        }
      }
      return $q.resolve('delete successful');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, newGallery){
    $log.debug('galleryService.updateGallery()');

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
      return $http.put(url, newGallery, config);
    })
    .then(res => {
      for (let i = 0; i < service.galleries.length; ++i){
        if(service.galleries[i] === galleryID){
          service.galleries[i] = res.data;
          break;
        }
      }
      return $q.resolve('update successful');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
