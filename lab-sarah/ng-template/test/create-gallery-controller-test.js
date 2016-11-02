'use strict';

describe('testing create-gallery-controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #createGallery', () => {
    it('should make a valid POST request', () => {
      let url = 'http://localhost:3000/api/gallery';

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      let exampleGallery = {
        name: 'dogs',
        desc: 'in parks',
      };

      //only if your call to the controller returns something do you need to do expect statements after .createGallery, otherwise the only expect statement is below?
      this.$httpBackend.expectPOST(url, exampleGallery, headers)
      .respond(200, {_id: '54321', username: 'sarah', name: 'dogs', desc: 'in parks'});

      let createGalleryCtrl = this.$componentController('createGallery', null);

      createGalleryCtrl.gallery = exampleGallery;

      createGalleryCtrl.createGallery(exampleGallery);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    }); //end of it should make POST request
  });

});
