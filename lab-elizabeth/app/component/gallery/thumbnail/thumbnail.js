'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$q', '$log', 'picService', thumbnailController],
  bindings: {
    pic: '<',
  },
};

function thumbnailController($q, $log, picService){
  $log.debug('init picService');

  this.deletePic = function(){
    $log.debug('thumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(this.gallery, this.pic)
    .then(() => {
      return $q.resolve();
    });
  };
}
