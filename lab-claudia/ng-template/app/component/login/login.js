'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', loginController],
  controllerAs: 'loginCtrl',
};

function loginController($log, $location, authService){
  this.login = function(user){
    authService.login(user)
    .then(() => {
      $location.path('#/home');
    })
    .catch(() => {
      console.log('Login Failed');
    });
  };
}
