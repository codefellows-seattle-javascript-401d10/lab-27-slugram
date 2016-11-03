'use strict';

describe('testing login controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $httpBackend, $window, $location, $componentController) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$location = $location;
      this.$componentController = $componentController;
    });
  });

  describe('testing #login', () => {
    it('should login a user', () => {
      let url = 'http://localhost:3000/api/login';
      let user = {
        username: 'exampleUser',
        password: 'examplePassword',
      };
      let base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        Authorization: `Basic ${base64}`,
        Accept: 'application/json',
      };

      let loginCtrl = this.$componentController('login');

      this.$httpBackend.expectGET(url, headers)
      .respond(200, 'thisatoken');

      loginCtrl.login(user);

      this.$httpBackend.flush();
      expect(this.$location.path()).toBe('/home');
      this.$rootScope.$apply();
    });
  });
});
