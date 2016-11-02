'use strict';

describe('testing gallery-li controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      authService.setToken('secret');
      this.authService = authService;
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

  describe('testing #deleteDone()', () => {
    it('should call deleteDone', () => {

      let mockBindings = {
        gallery: {
          _id: '65432ONE',
          name: 'hello',
          desc: 'infomative',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('65432ONE');
        },
      };

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLICtrl.deleteDone({galleryData: galleryLICtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone with gallery after galleryDelete', () => {

      let url = 'http://localhost:3000/api/gallery/1234567';
      // Mock headers
      let headers = {
        Authorization: 'Bearer secret',
        Accept: 'application/json, text/plain, */*',
      };

      // set up object to be passed in
      let mockBindings = {
        gallery: {
          _id: '1234567',
          name: 'goose',
          desc: 'lary',
          pics: [],
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
        },
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLICtrl.deleteGallery(); //deleteGallery calls deleteDone()
      
      // Flush the backend
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

}); // end first describe block
