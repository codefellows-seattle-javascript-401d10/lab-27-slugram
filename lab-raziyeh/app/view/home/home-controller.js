'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];
  this.updateDate = { name:'', desc:''};

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

  this.updateGallery = function(galleyId) {
    galleryService.updateGallery(galleyId, this.updateDate)
    .then( () => {
      $log.debug('update gallery by Id');
      this.fetchGalleries();
    });
  };

  this.fetchGalleries();

  // when the locationChangeSuccess fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}