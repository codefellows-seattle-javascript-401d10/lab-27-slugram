'use strict';

describe('testing edit-gallery controller', function() {
  var url = 'http://localhost:3000/api/gallery';

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, authService, $componentController, $httpBackend ) => {
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
    this.authService.logout();  
  });

  describe('testing createGalley', () => {
    it('it should create a gallery', () => {
      let gallery = {
        name: 'lulwat', 
        desc: 'hello',
      };
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(url, gallery, headers)
      .respond(200, {_id:'23770504', username: 'Rozi',  name: 'xxx', desc:'xxx' , pics: []});

      let createGalleryCtrl = this.$componentController('createGallery');

      createGalleryCtrl.gallery = { name: 'lulwat', desc: 'hello'};
      createGalleryCtrl.createGallery();
      this.$httpBackend.flush();
      this.$rootScope.$apply();
      
      expect(createGalleryCtrl.gallery.name).toBe.null;
      expect(createGalleryCtrl.gallery.desc).toBe.null;
    });
  });
});