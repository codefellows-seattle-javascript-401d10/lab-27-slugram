'use strict';

module.exports = ['$q','$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('init picService');
  let service = {};

// route for making an upload
  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('picService.uploadGalleryPic()');
    // return promise
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      // don't need key value pairs with object literals in ES6
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        // information expected to be uploaded
        // things that are required in the back ending
        // info is being sent as multi part form data
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      });
    })
    // get a response that returns an image
    .then( res => {
      //add pic to the front of the array
      galleryData.pics.unshift(res.data);
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
    //get token
    //make request
  };

// route for deleting a pic
  service.deleteGalleryPic = function(galleryData, picID) {
    // Log name
    $log.debug('picService.deleteGalleryPic()');
    // Get a token from the auth service
    return authService.getToken()
    .then(token => {
      // Set the url to __API_URL__/api/gallery/:galleryID/pic/:picID
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picID}`;
      // Set config for http headers
      let config = {
        // Set authorization header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    // Make $http.delete request to url with config
      return $http.delete(url, config);
    })

    // On success you splice the pic out of the galleryData.pics array
    .then(() => {
      $log.log('Deleted pic sucessfully');
      for(let i = 0; i < galleryData.pics.length; i++){
        let current = galleryData.pics[i];
        if(current._id === picID){
          galleryData.pics.splice(i,1);
          break;
        }
      }
      // resolve undefined
      return $q.resolve(undefined);
    })
    // on error log error and reject error
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
