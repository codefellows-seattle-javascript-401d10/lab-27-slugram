'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&',
  },
};

function GalleryLIController($log, galleryService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    return galleryService.deleteGallery(this.gallery._id)
    .then(() => {
      //deleteDone was defined in a separate controller and passed in using &
      //when deletedone was originally defined, took in one argument, an object. But here it takes in an object with a galleryData property, so it is different. Gets changed in the home.html template
      //galleryData corresponds to the parameter passed in to delete-done in home.html
      this.deleteDone({galleryData: this.gallery});
    });
  };
}
