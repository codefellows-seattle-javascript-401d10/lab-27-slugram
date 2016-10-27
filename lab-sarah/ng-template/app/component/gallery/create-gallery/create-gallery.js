'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
};


function CreateGalleryController($log, galleryService){
  $log.debug('inig createGalleryCtrl');
  this.gallery = {};

  //create method called createGallery on the instance of the CreateGallery Controller, and within this method, call the galleryService.createGallery method
  this.createGallery = function() {
    //this is what happens when + is pressed
    galleryService.createGallery(this.gallery)
    .then(() => {
      //clear out the form fields
      this.gallery.name = null;
      this.gallery.desc = null;
    });

  };
}
