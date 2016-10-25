'use strict';

//components are configured as objects
module.exports = {
  template: require('./login.html'),
  controller: ['$log', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService) {
  this.login = function(user) {
    authService.login(user)
    .then(() => {
      $location.path('/home');
    })
    .catch(() => {
      console.log('failed to login');
    });
  };
}
