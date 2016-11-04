'use strict';

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log','$location', NavbarController],
  controllerAs: 'navbarCtrl',
};

function NavbarController($log, $location){
  $log.debug('navbar component');

  this.btnTitle = 'Sign in';
  if ($location.url() === '/home') {
    this.btnTitle = 'Log out';
    this.showLogout = true;
  }

  this.signin = function() {
    $location.url('/login');
  };
}