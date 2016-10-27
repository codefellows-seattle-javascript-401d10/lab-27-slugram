'use strict';

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', GalleryLiController],
  controllerAs: 'galleryLiCtrl',
  bindings: {
    gallery: '<', // one way data binding
  },
};

function GalleryLiController($log){
  $log.debug('init galleryLiCtrl');
}
