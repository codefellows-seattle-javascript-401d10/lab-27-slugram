'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
};

//only the create-gallery template has access to this controller. each controller only has access to the one view created by the template
function CreateGalleryController($log, galleryService){
  $log.debug('init createGalleryCtrl');
  //this.gallery is a single gallery object created when the user inputs a name and description, which then changes the ng-model createGalleryCtrl.gallery.name/desc, so this.gallery becomes the gallery the user inputted
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
