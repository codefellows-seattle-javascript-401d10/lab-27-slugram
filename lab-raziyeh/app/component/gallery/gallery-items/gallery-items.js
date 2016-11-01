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

  this.deleteGallery = function(galleyId){
    galleryService.deleteGallery(galleyId)
    .then( () => {
      console.log('galleries',this.galleries);
      $log.debug('delete gallery by Is, Done!'); 
    })
    .catch(err => {
      $log.debug('delete gallery failed', err.message);
    });
  };

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id)
    .then(() => {
      this.deleteDone({galleryData: this.gallery});
    });
  };
}