'use strict';

module.exports = {
  template: require('./gallery.html'),
  controller: ['$log', 'galleryService', GalleryController],
  controllerAs: 'galleryCtrl',
};

function GalleryController($log, galleryService){
  $log.debug('init GalleryController');

  this.gallery = {};

  this.createGallery = function(){
    galleryService.createGallery(this.gallery)
    .then( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
}
