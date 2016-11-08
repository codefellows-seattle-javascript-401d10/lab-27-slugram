'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService){
  $log.debug('init signupCtrl');

  authService.getToken()
  .then(() => {
    $location.url('/home');
  });

  this.signup = function(){
    $log.debug('signupCtrl.signup()');
    authService.signup(this.user)
    .then(() => {
      $location.url('/home');
    })
    .catch(() => {
      console.log('failed to sign-up');
    });
  };
}
