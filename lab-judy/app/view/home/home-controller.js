'use strict';

require('./_home.scss');

module.exports = ['$log', '$q', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $q, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function(){
    return galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
      return galleries;
    });
  };

  this.galleryDeleteDone = function(gallery){
    $log.debug('homeCtrl.galleryDeleteDone()');
    console.log('line 23,', this.currentGallery);
    if (this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  // when the controller gets created fetchGalleries
  this.fetchGalleries();

  // when the locationChangeSuccess fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}
