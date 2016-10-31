'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'), //creates <gallery-li></gallery-li>
  controller: ['$log', 'galleryService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    // & allows us to pass context from child scope to parent scope
    // & - means we pass in a function
    deleteDone: '&',
  },
};

function GalleryLIController($log, galleryService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    console.log('galleryservice.deleteGallery');
    console.log(this.gallery._id);
    galleryService.deleteGallery(this.gallery, this.gallery._id)
    // called when button is clicked - delete done is passed in in the template for home ctr;
    // when gal is sucessfully deleted, it calls delete done
    .then(() => {
      console.log('went in then block');
      // use obejct to map named parameters in function call
      // this.deleteDone - function added to the scope via binding
      // & - attributes are always named properties on an object
      this.deleteDone({galleryData: this.gallery});
    });
  };
}
