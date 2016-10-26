'use strict';

require('./_landing.scss');

module.exports = ['$log', function LandingController($log){
  $log.debug('Landing controller');

  this.showsignin = false;

  this.signin = function() {
    this.showsignin? this.showsignin = false : this.showsignin = true;
  };
  
}];