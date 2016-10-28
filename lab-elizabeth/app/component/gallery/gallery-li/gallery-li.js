'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService', GalleryLiController],
  controllerAs: 'galleryLiCtrl',
  bindings: {
    gallery: '<',
  },
};

function GalleryLiController($log, galleryService){
  $log.debug('init galleryLiCtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id);
  };
}
