'use strict';

describe('testing edit-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $httpBackend, $componentController, authService) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
      this.authService = authService;
      authService.setToken('1234');
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();
  });

  describe('testing component bindings', () => {
    it('should be a valid binding', () => {

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'lul',
          desc: 'wat',
          pics: [],
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

      expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
      expect(editGalleryCtrl.gallery._id).toEqual(mockBindings.gallery._id);
      expect(Array.isArray(editGalleryCtrl.gallery.pics)).toBe(true);

      this.$rootScope.$apply();
    });
  });

  describe('testing #updateGallery', () => {
    it('should update a gallery', () => {

      let url = 'http://localhost:3000/api/gallery/12345';
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'lul',
          desc: 'wat',
          pics: [],
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'new?', desc: 'wat', pics: []}, headers)
      .respond(200);

      editGalleryCtrl.gallery.name = 'new?';

      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
