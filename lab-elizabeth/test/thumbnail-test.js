'use strict';

describe('testing thumbnail controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $rootScope, $httpBackend, $componentController) => {
      authService.setToken('54321');
      this.authService = authService;

      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('#deletePic()', () => {
    it('should delete an image', () => {
      let bindingsMock = {
        pic: {
          _id: 'empty',
          name: 'empty',
          desc: 'not much of a pic',
        },
        gallery: {
          _id: 'helloworld',
          name: 'helloworld',
          desc: 'I am new',
          pics: [],
        },
      };
      let headers = {
        Authorization: 'Bearer 54321',
        Accept: 'application/json',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld/pic/empty', headers)
      .respond(204);

      let thumbnailCtrl = this.$componentController('thumbnail', null, bindingsMock);

      // thumbnailCtrl.gallery = galleryData;

      thumbnailCtrl.deletePic()
      .then(res => {
        expect(res).toBe('pic delete successful');
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
