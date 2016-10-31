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

function ThumbnailController($log, picService){
  $log.debug('init thumbnailCtrl');

  this.deletePic = function(){
    $log.debug('init thumbnailCtrl.deletePic()');

    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
