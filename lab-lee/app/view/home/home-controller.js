'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
    });
  };

  this.deleteGallery = function(galleryID) {
    $log.debug('init deleteGallery');
    galleryService.deleteGallery(galleryID);
  };

  this.updateGallery = function(galleryID, gallery) {
    $log.debug('init updateGallery');
    galleryService.updateGallery(galleryID, gallery);
  };

  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}
