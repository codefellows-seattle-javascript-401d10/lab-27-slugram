'use strict';

module.exports = {
  template: require('./gallery-items.html'),
  controller: ['$log','galleryService', GalleryItemsController],
  controllerAs: 'galleryItemsCtrl',
  bindings: {
    gallery: '<',
  },
};

function GalleryItemsController($log, galleryService){
  $log.debug('init galleryItemsCtrl');
  this.showEdit = false;

  this.deleteGallery = function(galleyId){
    galleryService.deleteGallery(galleyId)
    .then( () => {
      $log.debug('delete gallery by Id');      
    });
  };
}