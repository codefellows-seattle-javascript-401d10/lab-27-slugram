'use strict';

// Write a filter that allows fuzzy match displaying galleries and pictures by their name and desc properties
// create a searchBar component
// it should have one way binding with a seachTerm property
// it should have a button that will clear your search bar and its searchTerm property
// use this component to set the values of your searches for your filters

module.exports = {
  template: require('./searchbar.html'),
  controllerAs: 'searchbarCtrl',
  controller: ['$log', searchbarController],
  bindings: {
    searchTerm: '=',
    // searchGalleryTitle: '@',
    // searchPictureTitle: '@',
  },
};


function searchbarController($log){
  $log.log('init searchbarController');

  this.clearSearch = function(){
    //clear the input fields
    // some input = null
    this.searchTerm = null;
  };
}
