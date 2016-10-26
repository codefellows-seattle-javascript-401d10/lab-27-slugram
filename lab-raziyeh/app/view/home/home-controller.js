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
    });
  };

  this.deleteGallery = function(galleyId){
    galleryService.deleteGallery(galleyId)
    .then( () => {
      this.fetchGalleries();
      $log.debug('delete gallery by Id');
    });
  };

  // when the controller gets created fetchGalleries
  this.fetchGalleries();

  // when the locationChangeSuccess fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}