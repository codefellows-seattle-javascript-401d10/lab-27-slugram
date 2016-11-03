'use strict';

describe('testing create-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      authService.setToken('1234');
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #createGallery', () => {
    it('should create a gallery', () => {
      let url = 'http://localhost:3000/api/gallery';
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };
      let gallery = {
        name: 'newGallery',
        desc: 'newish',
      };

      let createGalleryCtrl = this.$componentController('createGallery', null, null);

      this.$httpBackend.expectPOST(url, gallery, headers)
      .respond(200, {name: createGalleryCtrl.name, desc: createGalleryCtrl.desc});

      createGalleryCtrl.gallery = {name: gallery.name, desc: gallery.desc};
      createGalleryCtrl.createGallery();

      this.$httpBackend.flush();
      expect(createGalleryCtrl.gallery.name).toBe(null);
      expect(createGalleryCtrl.gallery.desc).toBe(null);
      this.$rootScope.$apply();
    });
  });
});
