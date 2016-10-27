'use strict';

require('./_gallery-list.scss');

module.exports = {
  template: require('./gallery-list.html'),
  controller: ['$log', 'galleryService', GalleryListController],
  controllerAs: 'galleryListCtrl',
  bindings: {
    gallery: '<',
  },
};

function GalleryListController($log, galleryService){
  $log.debug('init galleryListCtrl');

  this.editGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id);
  };
}
