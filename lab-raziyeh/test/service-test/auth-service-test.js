'use strict';

describe('testing auth service', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.authService = authService;
      this.$window = $window;
      this.$rootScope = $rootScope;
      authService.setToken('1234');

      this.$httpBackend = $httpBackend;
    });
  });

  var url = 'http://localhost:3000/api';
  var user = {
    name: 'Rozi',
    username: 'rozibzargan',
    password: '123',
  };

  describe('testing setToken()', ()=> {
    it('should return a Token', ()=> {
      this.authService.setToken('hello')
      .then(token => {
        expect(token).toBe('hello');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing getToken()', ()=> {
    it('should return a Token', ()=> {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'hello');

      this.authService.getToken()
      .then(token => {
        expect(token).toBe('hello');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing sign up', () => {
    it('should create user', () => {
      
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
     
      this.$httpBackend.expectPOST(`${url}/signup`, user, headers)
      .respond(200, '100001');

      this.authService.signup(user)
      .then(token => {
        expect(token).toBe('100001');
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing sign in', () => {
    it('should return a user', () => {
      var base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };
      
      this.$httpBackend.expectGET(`${url}/login`, headers)
      .respond(200, '10000');

      this.authService.login(user)
      .then(token => {
        expect(token).toBe('10000');
      });
      this.$httpBackend.flush();
    });
  });
});