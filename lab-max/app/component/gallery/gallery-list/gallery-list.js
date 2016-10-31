'use strict';

require('./_gallery-list.scss');

module.exports = {
  template: require('./gallery-list.html'),
  controller: ['$log', 'galleryService', GalleryListController],
  controllerAs: 'galleryListCtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&',
  },
};

function GalleryListController($log, galleryService){
  $log.debug('init galleryListCtrl');

  this.editGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id)
    .then(() => {
      this.deleteDone({gallery: this.gallery});
    });
  };
}
