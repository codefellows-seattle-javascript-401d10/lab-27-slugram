'use strict';

describe('testing authService methods', function(){

  // beforeEach mocks the demoApp module
  //            mocks the service

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend, $window, $rootScope) => {
      this.authService = authService;
      authService.setToken('1234');

      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  //Testing setToken method (authService)
  describe('testing #service.setToken', () => {
    it('should return a new token', () => {
      this.authService.setToken('1234')
      .then((token) => {
        expect(token).toEqual('1234');
      })
      .catch((err) => {
        console.error(err);
      });
      this.$rootScope.$apply();
    });
  });

  //Testing getToken method (authService)
  describe('testing #service.getToken', () => {
    it('should retrieve a token from localStorage', () => {

      this.$window.localStorage.setItem('service.token', '1234');

      this.authService.getToken()
      .then((token) => {
        expect(token).toBe('1234');
      });
      this.$rootScope.$apply();
    });
  });

});
