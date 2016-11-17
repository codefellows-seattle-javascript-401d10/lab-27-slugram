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
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(this.gallery, this.pic)
    .then(() => {
      $log.debug('delete pic, Done!');
    })
    .catch(() => {
      $log.debug('delete pic by has error!');
    });
  };
} 