'use strict';

describe('testing create-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $rootScope, $httpBackend, $componentController) => {
      authService.setToken('54321');
      // console.log(this);
      this.authService = authService;

      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('#createGallery()', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'whippet',
        desc: 'whip it good',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 54321',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: 'helloworld', username: 'fiddydiddy', name: galleryData.name, desc: galleryData.desc, pics: []});

      let createGalleryCtrl = this.$componentController('createGallery', null);

      createGalleryCtrl.gallery = galleryData;

      expect(createGalleryCtrl.gallery.name).toEqual(galleryData.name);
      expect(createGalleryCtrl.gallery.desc).toEqual(galleryData.desc);

      createGalleryCtrl.createGallery()
      .then(() => {
        expect(createGalleryCtrl.gallery.name).toBe(null);
        expect(createGalleryCtrl.gallery.desc).toBe(null);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
