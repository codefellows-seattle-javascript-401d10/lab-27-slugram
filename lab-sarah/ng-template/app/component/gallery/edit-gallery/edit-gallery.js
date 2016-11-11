'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', '$q', 'galleryService',  EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<',
  },
};

function EditGalleryController($log, $q, galleryService){
  $log.debug('init editGalleryCtrl');

  this.updateGallery = function(){
    return galleryService.updateGallery(this.gallery, this.gallery._id)
    .then((gallery) => {
      $log.debug(gallery);
    });
  };
}
