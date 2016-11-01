'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
  },
};

function ThumbnailController($log, picService){
  $log.debug('init ThumbnailController');

  this.deletePic = function(galleryData, picData){
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(galleryData, picData);
  };
}
