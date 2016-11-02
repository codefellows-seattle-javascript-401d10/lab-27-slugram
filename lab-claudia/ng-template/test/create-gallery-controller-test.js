'use strict';

describe('testing create-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      authService.setToken('secret');

      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #createGallery()', () => {
    it('should return a created gallery', () => {

      let url = 'http://localhost:3000/api/gallery';

      let headers = {
        Authorization: 'Bearer secret',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };

      this.$httpBackend.expectPOST(url, {name:'exampleGallery', desc:'stuff'}, headers)
      .respond(200);

      let createGalleryCtrl = this.$componentController('createGallery', null);
      createGalleryCtrl.gallery = galleryData;
      createGalleryCtrl.createGallery(galleryData);

      // Flush the backend
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

}); // end first describe block
