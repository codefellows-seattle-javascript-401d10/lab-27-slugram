'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$q', '$log', 'picService', thumbnailController],
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function thumbnailController($q, $log, picService){
  $log.debug('init picService');

  this.deletePic = function(){
    $log.debug('thumbnailCtrl.deletePic()');
    return picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
