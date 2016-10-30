'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService', EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<',
  },
};

function EditGalleryController($log, galleryService){
  $log.debug('init editGalleryCtrl');

  this.updateGallery = function(galleryID, newGallery){
    galleryService.updateGallery(galleryID, newGallery);
  };

}
