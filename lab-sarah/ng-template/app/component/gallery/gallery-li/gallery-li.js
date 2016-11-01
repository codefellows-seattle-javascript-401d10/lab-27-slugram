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
    galleryService.deleteGallery(this.gallery, this.gallery._id)
    .then(() => {
      this.deleteDone({galleryData: this.gallery});
    });
  };
}
