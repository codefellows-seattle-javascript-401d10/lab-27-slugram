'use strict';

require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<',
  },
};

function UploadPicController($log, picService) {
  $log.debug('init uploadPicCtrl');
  this.pic = {},
  this.uploadPic = function() {
    picService.uploadGalleryPic(this.gallery, this.pic)
  // when a pic is succesfully uploaded, set it to null!
    .then(() => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    });
  };
}
