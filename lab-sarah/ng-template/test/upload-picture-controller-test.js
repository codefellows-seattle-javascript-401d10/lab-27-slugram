'use strict';

describe('testing upload pic controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, Upload, authService) => {
      authService.setToken('4747');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.Upload = Upload;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  describe('testing #uploadPic', () => {
    let mockBindings = {
      gallery: {
        name: 'poop',
        desc: 'on a stick',
      },
    };
  });
});
