'use strict';

require('./_login.scss');

module.exports = ['$log', function LoginController($log){
  $log.debug('Login controller');

  this.showsignin = false;

  this.signin = function() {
    this.showsignin? this.showsignin = false : this.showsignin = true;
  };
  
}];