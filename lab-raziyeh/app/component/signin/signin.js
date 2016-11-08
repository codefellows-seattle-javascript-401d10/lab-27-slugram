'use strict';

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$location', 'authService', SigninController],
  controllerAs: 'signinCtrl',
};

function SigninController($log, $location, authService){
  this.signin = function(user){
    authService.login(user)
    .then(() => {
      $location.path('/home');
    })
    .catch(() => {
      console.log('faild to signin');
    });
  };
}