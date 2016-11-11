// being made by our signup.js file

'use strict';

require('./_landing.scss');

module.exports = ['$log', LandingController];

function LandingController($log){
  $log.log('LandingController in landingView');
  //toggle between showing and hiding signup and login
  this.showSignup = true;
}
