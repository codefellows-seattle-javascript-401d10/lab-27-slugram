'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', LandingController];

function LandingController($log, $location){
  let url = $location.url();
  this.showSignup = url === 'join#signup' || url === 'join';
}
