'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', '$q', 'galleryService', GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&',
  },
};

function GalleryLIController($log, $q, galleryService){
  $log.debug('initial galleryLICtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    return galleryService.deleteGallery(this.gallery._id)
    .then(() => {
      this.deleteDone({galleryData: this.gallery});
      return $q.resolve('gallery successfully deleted');
    });
  };
}
