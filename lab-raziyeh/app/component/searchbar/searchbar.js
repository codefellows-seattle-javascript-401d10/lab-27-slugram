'use strict';

module.exports = {
  template: require('./searchbar.html'),
  controller: ['$log', SearchbarController],
  controllerAs: 'searchbarCtrl',
  bindings: {
    searchTerm: '=',
    fieldSearch: '=',
  },
};

function SearchbarController($log){
  $log.debug('searchbarCtrl component');  

  this.fieldSearch = 'name';
  this.activeName = true;
  this.activeDesc = false;

  this.reset = function() {
    this.searchTerm = null;
    this.searchtext = null;
  };

  this.makeActive = function(value) {
    if(value === 'desc') {
      this.activeName = false;
      this.activeDesc = true;
      this.fieldSearch = 'desc';
      return;
    }
    this.activeName = true;
    this.activeDesc = false;
    this.fieldSearch = 'name';
  };
}