'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$log', 'picService', ThumbnailController],
  bindings: {
    gallery: '<',
    pic: '<',
  },
};

function ThumbnailController($log, picService){
  $log.debug('init picService');

  this.deletePic = function(){
    $log.debug('thumbnailCtrl.deletePic()');
    //deleteGalleryPic takes galleryData and picData
    //every time you use bindings, is on the scope, so have to reference it with this
    picService.deleteGalleryPic(this.gallery, this.pic._id);
  };
}
