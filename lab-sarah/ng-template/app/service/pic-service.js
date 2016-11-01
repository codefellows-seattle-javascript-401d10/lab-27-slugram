'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${API_URL}/api/gallery/${galleryData._id}/pic`;
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
    .then(res => {
      galleryData.pics.unshift(res.data);
      $log.log('success\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  service.deleteGalleryPic =
  //picData is just the id of the picture
  //galleryData is the gallery Object
   function(galleryData, picID){
    // TODO: log the deleteGalleryPic method name
    $log.debug('picService.deleteGalleryPic()');
    // TODO: get a token from the auth service
    return authService.getToken()
    .then((token) => {
      let url = `${API_URL}/api/gallery/${galleryData._id}/pic/${picID}`;
      let config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      //remove picture from galleryData.pics array
      let i = galleryData.pics.indexOf(picID);
      galleryData.pics.splice(i, 1);
      return $q.resolve('success');
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err);
    });
   };

  return service;
}
