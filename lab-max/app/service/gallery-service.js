'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');

  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('init galleryService.createGallery()');

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
    .then( res => {
      $log.log('created a gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('init galleryService.fetchGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery?sort=dsc`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successfully fetched galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, galleryData){
    $log.debug('init galleryService.updateGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.put(url, galleryData, config);
    })
    .then( res => {
      console.log(res);
      $log.log('successfully update a gallery');
      let gallery = res.data;
      for(var i=0; i<service.galleries.length; ++i){
        if(galleryID === service.galleries[i]._id){
          service.galleries[i] = gallery;
        }
      }
      return;
    })
    .catch( err => {
      $log.error(err.message);
      $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID){
    $log.debug('init galleryService.deleteGallery()');

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
      $log.debug('delete from galleries array');
      for(var i=0; i<service.galleries.length; ++i){
        if(galleryID === service.galleries[i]._id){
          service.galleries.splice(i, 1);
        }
      }
      return;
    })
    .catch( err => {
      $log.error(err.message);
      $q.reject(err);
    });
  };

  return service;
}
