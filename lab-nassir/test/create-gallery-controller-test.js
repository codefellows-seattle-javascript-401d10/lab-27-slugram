'use strict';

describe('Testing createGalleryCtrl', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $componentController, $rootScope, $httpBackend) => {
      authService.setToken('1234');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('Testing createGalleryCtrl.createGallery', () => {
    it('should return a gallery and a 200 status', () => {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer 1234`,
        'Content-Type': 'application/json',
      };

      let gallery = {
        name: 'Dumb Varmints',
        desc: 'politicians amirite?',
      };

      let url = 'http://localhost:3000/api/gallery/';

      let createGalleryCtrl = this.$componentController('createGallery', null, null);


      this.$httpBackend.expectPOST(url, gallery, headers)
      .respond(200, {name: createGalleryCtrl.name, desc: createGalleryCtrl.desc});

      createGalleryCtrl.gallery = {
        name: gallery.name,
        desc: gallery.desc,
      };
      createGalleryCtrl.createGallery();

      this.$httpBackend.flush();

      expect(createGalleryCtrl.gallery.name).toBe(null);
      expect(createGalleryCtrl.gallery.desc).toBe(null);

      this.$rootScope.$apply();
    });
  });

});
