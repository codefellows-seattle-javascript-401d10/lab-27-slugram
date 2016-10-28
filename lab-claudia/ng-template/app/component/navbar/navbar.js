'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    //@ allows us to pass name in through attribute
    appTitle: '@', //this property gets set on the controllers
  },
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');

  // nav logic specific to $location.path()
  // if path is /join, hides buttons
  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;

    // if there is a token, redirect to the home page
      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

  // if not /join, check if there is a token, if not, go back to the join page
    if (path !== '/join'){
      this.hideButtons = false; // buttons are un-hidden
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }
  };

  // on pageload call this.checkPath()
  // run on pageload, as soon as navbar is instantiated
  this.checkPath();

  // on page success page change call this.checkPath()
  // every time url is modified, or anchortag, runs checkPath
  // $locationChangeSuccess is an event built into the root scope
  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });


  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/'); // rediretcs to /, which we configured to take you back to join
    });
  };
}
