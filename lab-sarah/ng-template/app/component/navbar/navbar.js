'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, authService){
  $log.debug('init navbarCtrl');

  //navigation logic specific to $location.path(), or url. Depending on url, want different things to be shown and hidden
  this.checkPath = function(){
    // $location.path is only /join part $location.url is whole url
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = false;
      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

    if (path !== '/join'){
      this.hideButtons = true;
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }
  };

  //on page load, call this.checkPath()
  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };
}
