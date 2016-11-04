'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

//$location is the part of angular that allows us to switch from view to view, switch from route to route
function SignupController($log, $location, authService) {
  //add a signup method to this instance of the signupController, and assign that to the signup method on the authService service
  this.signup = function(user){
    authService.signup(user)
    .then(() => {
      $location.url('/home');
    })
    .catch(() => {
      console.log('failed to signup');
    });
  };
}
