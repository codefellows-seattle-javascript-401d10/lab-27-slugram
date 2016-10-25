'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService ){
  //variables
  this.showsignin = false;
  this.showsignup = false;

  //functions
  this.signin = function() {
    this.showsignin ? this.showsignin = false : this.showsignin = true;
  };
  this.signup = function() {
    this.showsignup ? this.showsignup = false : this.showsignup = true;
  };
}