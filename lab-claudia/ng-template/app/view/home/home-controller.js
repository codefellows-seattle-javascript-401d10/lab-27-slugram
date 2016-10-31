'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    // every time we fetch, we get an array of galleries
    // sets galleries as a property on the home controller
    .then( galleries => {
      this.galleries = galleries;
      // current gallery is the first one in the index
      // in html, gallery is passed into the thumbnail-conatiner
      this.currentGallery = galleries[0];
      $log.log('Succesfully found gallery');
    });
  };

  this.galleryDeleteDone = function(gallery){
    $log.debug('init homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id == gallery._id) {
      // if the current gallery has ben deleted, it is set to null
      this.currentGallery = null;
    }
  };

  // when page is loaded (controller gets created), call fetchGalleries
  this.fetchGalleries();
  // any time url changes (locationChangeSuccess), call fetch galleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}
