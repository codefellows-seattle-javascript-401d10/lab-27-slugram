'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$log', 'picService', thumbnailController],
  bindings: {
    pic: '<',
  },
};

function thumbnailController($log, picService){
  $log.debug('init picService');

  this.deletePic = function(){
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
