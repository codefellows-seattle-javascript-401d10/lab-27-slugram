'use strict';

describe('testing auth service', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $q, authService, $window, $httpBackend) => {
      this.authService = authService;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing $q.resolve', () => {
    it('should succeed', () => {
      this.$q.resolve(2)
      .then(num => {
        expect(num).toBe(3);
      });
    });
  });

  describe('testing #getToken()', () => {

    it('should return a token', () => {
      this.authService.token = 'this token';
      this.authService.getToken()
      .then( token => {
        expect(token).toBe('this token');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing #getToken()', () => {

    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.token = 'another token';
      this.authService.getToken()
      .then( token => {
        expect(token).toBe('another token');
      });

      this.$rootScope.$apply();
    });
  });
});
