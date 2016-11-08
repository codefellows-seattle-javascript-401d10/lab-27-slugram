'use strict';

require('./_pic-filter.scss');

module.exports = {
  template: require('./pic-filter.html'),
  controllerAs: 'picFilterCtrl',
  bindings: {
    gallery: '<',
    pic: '<',
  },
};
