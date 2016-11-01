'use strict';

module.exports = {
  template: require('./gallery-items.html'),
  controller: ['$log','galleryService', GalleryItemsController],
  controllerAs: 'galleryItemsCtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&',
  },
};

function GalleryItemsController($log, galleryService){
  $log.debug('init galleryItemsCtrl');
  this.showEdit = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id)
    .then( () => {
      $log.debug('delete gallery by Is, Done!'); 
      this.deleteDone({galleryData: this.gallery});
    })
    .catch(err => {
      $log.debug('delete gallery failed', err.message);
    });
  };
}