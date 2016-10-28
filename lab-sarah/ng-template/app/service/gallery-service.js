'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};
  //every time we make a gallery, just push into this array
  //an array of whole gallery objects
  service.galleries = [];

  //take in gallery, and make POST request
  service.createGallery= function(gallery){
    $log.debug('galleryService.createGallery');

    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery`;
      let config = {
        headers: {
          //accept is like, this is what we expect back
          Accept: 'application/json',
          //content-type is what we will send them
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config);
    })
    .then(res => {
      //once you have gallery, push into service.gallery array
      $log.log('successfully created gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      //if we want it to go to next catch block, have to reject error, instead of just returning it
      return $q.reject(err);
    });
  };

  //DELETE request
  service.deleteGallery = function(gallery, galleryID){
    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('successfully deleted gallery');
      //remove gallery from the service.galleries array
      //remove the gallery from the database? or is this handled on backend?
      let i = service.galleries.indexOf(gallery);
      service.galleries.splice(i, 1);
      return $q.resolve('success');
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  //GET request to fetch galleries
  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery/?sort=dsc`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.get(url, config);
    })
    .then(res => {
      $log.log('successfully fetched user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  //PUT request
  service.updateGallery = function(gallery, galleryID) {
    $log.debug('galleryService.updateGallery()');
    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, gallery, config);
    })
    .then((res) => {
      // replace the gallery in service.galleries with the new updated gallery
      //if you have an array of data, will almost always have to do a for loop across the array, and replace the old thing with the updated thing
      for (let i = 0; i < service.galleries.length; i++) {
        if (service.galleries[i]._id === galleryID) {
          service.galleries[i] = res.data;
          // break; //if you've found it, exit the loop
        }
      }
      return res.data;
      // return $q.resolve('updated');
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
