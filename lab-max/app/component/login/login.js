'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService){
  $log.debug('init LoginController');
  this.login = function(user){
    authService.login(user)
    .then( () => {
      $location.path('/home');
    })
    .catch( () => {
      console.log('failed to login');
    });
  };
}
