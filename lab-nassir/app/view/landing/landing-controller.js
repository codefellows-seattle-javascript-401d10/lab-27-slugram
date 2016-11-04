'use strict';

require('./_landing.scss');

module.exports = ['$log', LandingController];

function LandingController($log) {
  $log.debug('init LandingController;');
  this.showLogin = false;

  this.switchLoginSignup = function() {
    this.showLogin ? this.showLogin = false : this.showLogin = true;
  };
}
