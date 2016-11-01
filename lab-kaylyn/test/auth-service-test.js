'use strict';

describe('testing authService', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, $httpBackend) => {
      this.authService = authService;
      this.$window = $window;
      authService.setToken('1234');

      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing authService service.signup', () => {
    it('should return a user', () => {
      let user = {
        name: 'userName',
        email: 'userEmail',
        password: 'userPassword',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', user, headers)
      .respond(200, {token: '666'});

      this.authService.signup(user);
      this.$httpBackend.flush();
    });
  });

  describe('testing authService service.login', () => {
    it('should authorize a returning user', () => {
      let user = {
        name: 'userName',
        password: 'userPassword',
      };
      let base64 = this.$window.btoa(`${user.username}:${user.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, '666');

      this.authService.login(user)
      .then(token => {
        expect(token).toBe('666');
      });

      this.$httpBackend.flush();
    });
  });
});
