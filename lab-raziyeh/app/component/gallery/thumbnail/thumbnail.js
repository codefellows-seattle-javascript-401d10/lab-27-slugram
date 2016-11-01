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

  this.deletePic = function(gallery, pic){
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(gallery, pic)
    .then(() => {
      $log.debug('delete gallery, Done!');
    })
    .catch(() => {
      $log.debug('delete gallery by has error!');
    });
  };
} 