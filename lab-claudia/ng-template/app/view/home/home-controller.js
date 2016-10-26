'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      $log.log('Succesfully found gallery');
    });
  };
  // when the controller gets created fetchGalleries
  this.fetchGalleries();

  // when the locationChangeSuccess fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

  this.deleteGallery = function(gallery, galleryID) {
    galleryService.deleteGallery(gallery, galleryID)
    .then(() => {
      $log.log('Successfully deleted gallery');
    });
  };

  this.updateGallery = function(gallery, galleryID) {
    galleryService.updateGallery(gallery, galleryID)
    .then( () => {
      $log.log('Successfully updated gallery');
    });
  };
}
