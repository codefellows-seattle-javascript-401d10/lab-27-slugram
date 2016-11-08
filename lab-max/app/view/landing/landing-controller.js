'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService){
  $log.debug('init LandingController');
  this.showLogin = false;

  this.loginToggle = function(){
    if(this.showLogin === false)
      return this.showLogin = true;

    this.showLogin = false;
  };
}
