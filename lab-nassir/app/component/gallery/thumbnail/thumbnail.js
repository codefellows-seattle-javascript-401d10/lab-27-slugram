'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$log', 'picService', ThumbnailController],
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function ThumbnailController($log, picService) {
  $log.debug('Init ThumbnailController;');

  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic();');
    $log.debug(this.gallery);
    $log.debug(this.pic);
    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
