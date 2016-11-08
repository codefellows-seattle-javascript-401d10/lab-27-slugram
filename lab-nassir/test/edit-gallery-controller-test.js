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
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('Testing component bindings', () => {
    it('should pass values into the controller, I think', () => {
      let mockBindings = {
        gallery: {
          name: 'NSFW',
          desc: 'dogs, cats and a tame weasel wearing NO CLOTHES AT ALL!!1',
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

      expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

      this.$rootScope.$apply();
    });
  });

  describe('Testing editGalleryCtrl.updateGallery', () => {
    it('should return an updated gallery', () => {

      let url = 'http://localhost:3000';

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'Filthy Animals',
          desc: 'various creatures covered in mud and leaves',
        },
      };

      let newGallery = {
        _id: '12345',
        name: 'Filthy Animals',
        desc: 'literally just dogs',
      };

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

      editGalleryCtrl.gallery.desc = 'literally just dogs';

      this.$httpBackend.expectPUT(`${url}/api/gallery/12345`, newGallery, headers)
      .respond(200);

      editGalleryCtrl.updateGallery();

      expect(editGalleryCtrl.gallery.name).toBe(newGallery.name);
      expect(editGalleryCtrl.gallery.desc).toBe(newGallery.desc);
      expect(editGalleryCtrl.gallery.desc).not.toBe('various creatures covered in mud and leaves');

      this.$rootScope.$apply();
      this.$httpBackend.flush();
    });
  });
});
