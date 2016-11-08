'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService){
  $log.debug('init signupCtrl');

  this.signup = function(user){
    authService.signup(user)
    .then( () => {
      $location.path('/home');
    })
    .catch( () => {
      console.log('failed to signup');
    });
  };
}
