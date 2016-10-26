'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService ){
  $log.debug('authService.LandingController()');

  this.showLogin = false;
  this.showSignup = false;

  this.login = function(){
    this.showLogin ? this.showLogin = false : this.showLogin = true;
  };

  this.signup = function(){
    this.showSignup ? this.showSignup = false : this.showSignup = true;
  };
}
