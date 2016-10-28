'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService', EditGalleryController],
  controllerAs: 'EditGalleryCtrl',
  bindings: {
    gallery: '<',
  },
};

function EditGalleryController($log, galleryService){
  $log.debug('init EditGalleryCtrl');

  this.updateGallery = function(galleryID, newGallery){
    galleryService.updateGallery(galleryID, newGallery);
  };

}
