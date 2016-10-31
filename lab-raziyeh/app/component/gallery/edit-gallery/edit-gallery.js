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

  this.updateGallery = function(galleyId, galleyData){
    galleryService.updateGallery(galleyId, galleyData)
    .catch( () => {
      $log.debug('error in editGalleryCtrl');
    });
  };
}