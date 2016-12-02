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
  $log.debug('init picService');

  this.deletePic = function(){
    picService.deleteGalleryPic(this.gallery, this.pic._id);
    $log.debug('thumbnailCtrl.deletePic()');
  };
}
