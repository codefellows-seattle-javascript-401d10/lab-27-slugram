'use strict';

module.exports = {
  template: require('./search-bar.html'),
  controller: ['$log', SearchBarController],
  controllerAs: 'searchBarCtrl',
  bindings: {
    searchTerm: '=',
  },
};

function SearchBarController($log){
  $log.debug('init searchBarCtrl');

  this.clearInput = function(){
    $log.debug('init searchBarCtrl.clearInput()');
    this.searchTerm = '';
  };
}
