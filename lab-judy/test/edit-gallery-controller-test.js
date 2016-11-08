'use strict';

describe('testing edit-gallery controller', function (){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
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

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'judy',
        desc: 'vue',
      },
    };
    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

    expect(editGalleryCtrl.gallery.name).toBe(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toBe(mockBindings.gallery.desc);
    this.$rootScope.$apply();
  });

  describe('testing #updateGallery', () => {

    it('should make a valid PUT requests', () => {
      let url ='http://localhost:3000/api/gallery/12345';

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'new name', desc: 'hello'}, headers)
      .respond(200, {_id: '12345', name: 'new name', desc: 'hello'});

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'lulwat',
          desc: 'hello',
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'new name';

      editGalleryCtrl.updateGallery()
      .then((res) => {
        expect(editGalleryCtrl.gallery.name).toBe('new name')
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

});
