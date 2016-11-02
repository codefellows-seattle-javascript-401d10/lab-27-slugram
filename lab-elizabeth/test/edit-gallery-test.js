'use strict';

describe('testing edit-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $rootScope, $httpBackend, $componentController) => {
      authService.setToken('12345');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'lulwat',
        desc: 'my cool beach adventure',
      },
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('testing #updateGallery()', () => {
    it('should make a valid PUT request', () => {

      let url = 'http://localhost:3000/api/gallery/12345';
      let headers = {
        'Accept': 'application/json',
        Authorization: 'Bearer 12345',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'new name', desc: 'hello'}, headers)
      .respond(200);

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'lulwat',
          desc: 'hello',
        },
      };
      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'new name';

      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
