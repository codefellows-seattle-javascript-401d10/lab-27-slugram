'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  //an array of gallery ID's, shares same reference as array in gallery-service
  //any time you change this.galleries, cascades down to components
  //changes the views
  this.galleries = [];

  //when you call fetchGalleries on the gallery Service, reassigns the gallery array to the array in the gallery-service. So when you change the gallery array, it changes in the service and the home-controller. pass by reference
  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
    });
  };

  //this is where the function is actually defined, is invoked in gallery-li controller
  this.galleryDeleteDone = function(gallery){
    $log.debug('homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  //call the fetchGallery method, which calls the galleryService when this(the home) controller is initialized
  this.fetchGalleries();

//do this instead of window.onLoad, because the page actually never reloads, we just switch the views using ui-view
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}
