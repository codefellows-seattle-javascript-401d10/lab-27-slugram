'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', picService];

function picService($log, $q, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('init picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      });
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      $log.log('Success', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleryPic = function(galleryData, picData){
    $log.debug('init picService.deleteGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.delete(url, config);
    })
    .then(() => {
      $log.debug('delete from pics array');
      for (var i=0; i<galleryData.pics.length; ++i){
        if (galleryData.pics[i]._id === picData._id){
          galleryData.pics.splice(i, 1);
        }
      }
      return;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
