'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  //takes in a pic via one way data binding
  //binding defines an attribute 'pic' in the html
  //assigns 'pic' on the scope of the thumbnail-conatiner - an object can be passed in
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function ThumbnailController($log, picService) {
  $log.debug('init thumbnailCtrl');
  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic');
   picService.deleteGalleryPic(this.gallery, this.pic._id);

  };
}
