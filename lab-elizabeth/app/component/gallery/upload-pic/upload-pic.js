'use strict';

module.exports = {
  controllerAs: 'uploadPicCtrl',
  template: require('./upload-pic.html'),
  controller: ['$q', '$log', 'picService', UploadPicController],
  bindings: {
    gallery: '<',
  },
};

function UploadPicController($q, $log, picService){
  $log.debug('init uploadPicCtrl');
  this.pic = {},
  this.uploadPic = function(){

    return picService.uploadGalleryPic(this.gallery, this.pic)
    .then(() => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
      return $q.resolve();
    });

  };
}
