'use strict';

describe('testing create-gallery controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, $window, authService ) => {
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

  describe('testing #CreateGalleryController', () => {
    it('should return a gallery using #createGallery()', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'memories from my beach adventure',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte',  name: galleryData.name, desc: galleryData.desc, pics: []});

      let createGalleryCtrl = this.$componentController('createGallery', null);

      createGalleryCtrl.gallery = galleryData;
      createGalleryCtrl.createGallery();


      expect(createGalleryCtrl.gallery.name).toBe(galleryData.name);
      expect(createGalleryCtrl.gallery.desc).toBe(galleryData.desc);


      this.$httpBackend.flush();

      //test that fields are null
      for(var key in createGalleryCtrl.gallery){
        expect(createGalleryCtrl.gallery[key]).toBe(null);
      }
      this.$rootScope.$apply();
    });
  });


});
