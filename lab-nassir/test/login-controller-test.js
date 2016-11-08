'use strict';

describe('Testing loginCtrl', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $window, $location, $componentController, authService, $httpBackend) => {
      authService.setToken('tokentoken');
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$location = $location;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('Testing loginCtrl.login', () => {
    it('should return a token and redirect to /home', () => {
      let url = 'http://localhost:3000/api/login';

      let exampleUser = {
        username: 'T0P.Secret.Pa33word!',
        password: 'Bill_Jenkins',
      };

      let base64 = this.$window.btoa(`${exampleUser.username}:${exampleUser.password}`);

      let headers = {
        Authorization: `Basic ${base64}`,
        Accept: 'application/json',
      };

      let loginCtrl = this.$componentController('login', null, null);

      this.$httpBackend.expectGET(url, headers)
      .respond(200, 'thisisatoken');

      loginCtrl.login(exampleUser);

      this.$httpBackend.flush();
      expect(this.$location.path()).toBe('/home');
      this.$rootScope.$apply();
    });
  });

});
