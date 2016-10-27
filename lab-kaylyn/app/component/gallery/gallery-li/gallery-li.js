'use strict';

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService', GalleryLiController],
  controllerAs: 'galleryLiCtrl',
  bindings: {
    gallery: '<', // one way data binding
  },
};

function GalleryLiController($log, galleryService){
  $log.debug('init galleryLiCtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id);
  };
}
