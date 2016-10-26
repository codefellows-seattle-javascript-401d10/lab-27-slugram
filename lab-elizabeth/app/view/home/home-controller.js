'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootscope', 'galleryService', HomeController ];

function HomeController($log, $rootscope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries;
    });
  };

  this.fetchGalleries();

  $rootscope.$on('locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}
