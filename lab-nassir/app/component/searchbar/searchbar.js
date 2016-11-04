'use strict';

require('./_searchbar.scss');

module.exports = {
  template: require('./searchbar.html'),
  controller: ['$log', SearchbarController],
  controllerAs: 'searchbarCtrl',
  bindings: {
    searchTerm: '=',
  },
};

function SearchbarController($log) {
  $log.debug('Initializing SearchbarController;');

  this.clearSearch = function() {
    this.searchTerm = null;
  };
}
