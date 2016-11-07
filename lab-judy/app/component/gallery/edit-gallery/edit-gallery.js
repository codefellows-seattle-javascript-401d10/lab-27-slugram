'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', '$q', 'galleryService', EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<',
  },
};

function EditGalleryController($log, $q, galleryService){
  $log.debug('init editGalleryCtrl');

  this.updateGallery = function(){
    console.log('lalala working?');
    return galleryService.updateGallery(this.gallery._id, this.gallery).
    then((gallery) => {
      gallery = this.gallery;
      return $q.resolve(gallery);
    });
  };
}
