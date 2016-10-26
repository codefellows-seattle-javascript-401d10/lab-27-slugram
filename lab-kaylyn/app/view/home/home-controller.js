'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');

  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
    });
  };

  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

  this.deleteGallery = function(galleryID){
    galleryService.deleteGallery(galleryID);
  };

  this.updateGallery = function(galleryID, gallery){
    galleryService.updateGallery(galleryID, gallery);
  };

}
