//being made by our signup.js file

'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService ){
  $log.log('LandingController in landingView');
  authService;
  //toggle between showing and hiding signup and login
}
