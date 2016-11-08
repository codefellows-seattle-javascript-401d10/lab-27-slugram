'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$q', '$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
};

function CreateGalleryController($q, $log, galleryService){
  $log.debug('init createGalleryCtrl');
  this.gallery = {};

  this.createGallery = function(){
    return galleryService.createGallery(this.gallery)
    .then(() => {
      this.gallery.name = null;
      this.gallery.desc = null;
      return $q.resolve();
    });
  };
}
