'use strict';

describe('testing auth service', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, $httpBackend) => {
      this.authService = authService;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing authService.setToken(_token)', () => {

    it('should return a token', () => {
      this.authService.setToken('1234');
      expect(this.authService.token).toBe('1234');
    });
  });

  describe('testing authService.getToken()', () => {

    it('should return a token', () => {
      this.authService.setToken('1234');
      this.authService.getToken();
      expect(this.authService.token).toBe('1234');
      expect(this.authService.token).toBe(this.$window.localStorage.getItem('service.token'));
    });
  });

  describe('testing authService.logout()', () => {

    it('should return a token equal to null', () => {
      this.authService.setToken('1234');
      this.authService.logout();
      expect(this.authService.token).toBe(null);
    });
  });

  describe('testing authService.signup(user)', () => {

    it('should return a token', () => {
      let user = {
        name: 'exampleUser',
        email: 'example@example',
        password: '1234567890',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', user, headers)
      .respond(200, '001122334455');

      this.authService.signup(user)
      .then(token => {
        expect(token).toBe('001122334455');
      });

      this.$httpBackend.flush();
    });
  });

  describe('testing authService.login(user)', () => {

    it('should return a token', () => {
      let user = {
        username: 'exampleUser',
        password: '1234567890',
      };

      let base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, '001122334455');

      this.authService.login(user)
      .then(token => {
        expect(token).toBe('001122334455');
      });

      this.$httpBackend.flush();
    });
  });
});
