'use strict';

describe('testing login controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $httpBackend, $location, $componentController) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
      this.$componentController = $componentController;
    });
  });

  describe('testing #signup', () => {
    it('should signup a user', () => {
      let url = 'http://localhost:3000/api/signup';
      let user = {
        name: 'exampleUser',
        email: 'example@example',
        password: 'examplePassword',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      let signupCtrl = this.$componentController('signup');

      this.$httpBackend.expectPOST(url, user, headers)
      .respond(200, 'thisatoken');

      signupCtrl.signup(user);

      this.$httpBackend.flush();
      expect(this.$location.path()).toBe('/home');
      this.$rootScope.$apply();
    });
  });
});
