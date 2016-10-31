'use strict';

module.expots = ['$q', '$log', '$http', 'Upload', 'authService', picService];
// ng file upload gives us the ability to do multipart header uploads

function picService($q, $log, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url =  `$__API_URL__/api/gallery/${galleryData._id}/pic`;
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
    //upon successful request
    .then(res => {
      galleryData.pics.unshift(res.data);
      console.log('res.data', res.data);
      return res.data;
    })
    .catch(err => {
      $log.err(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
