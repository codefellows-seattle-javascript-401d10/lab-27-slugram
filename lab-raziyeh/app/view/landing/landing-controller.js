'use strict';

require('./_landing.scss');

module.exports = ['$log', function LandingController($log){
  $log.debug('Landing controller');

  this.showsignin = false;
  this.showsignup = false;

  this.signin = function() {
    this.showsignin = true;
    this.showsignup = false;
  };
  
  this.signup = function() {
    this.showsignin = false;
    this.showsignup = true;
  };
}];