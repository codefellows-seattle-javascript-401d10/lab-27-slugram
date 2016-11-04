'use strict';

describe('Testing editGalleryCtrl', function() {
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
    this.authService.logout();
  });

  describe('Testing editGalleryCtrl.createGallery', () => {
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

      let createGalleryCtrl = this.$componentController('createGallery', null);

      createGalleryCtrl.gallery = {
        name: 'Dumb Varmints',
        desc: 'politicians amirite?',
      };

      this.$httpBackend.expectPOST(`http://localhost:3000/api/gallery/`, gallery, headers)
      .respond(200, createGalleryCtrl.gallery);

      createGalleryCtrl.createGallery();

      this.$httpBackend.flush();

      expect(createGalleryCtrl.gallery.name).toBe(null);
      expect(createGalleryCtrl.gallery.desc).toBe(null);

      this.$rootScope.$apply();
    });
  });

});
