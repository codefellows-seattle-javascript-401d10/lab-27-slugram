'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService) {
  $log.debug('init SignupController;');
  this.signup = function(user) {
    authService.signup(user)
    .then(() => {
      $location.path('/home');
    })
    .catch(() => {
      $log.error('Failed to signup through SignupController...');
    });
  };
}
