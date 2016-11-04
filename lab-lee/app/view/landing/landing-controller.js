'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'authService', LandingController];

//export rootScope above but not injecting it into the LandingController?
function LandingController($log, $location) {
  $log.debug('init landingCtrl');
  let url = $location.url();
  this.showSignup = url === '/landing#signup' || url === '/landing';
}
