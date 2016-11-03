'use strict';

describe('testing gallery-list controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, authService, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.authService = authService;
      authService.setToken('1234');
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();
  });

  describe('testing #deleteDone', () => {

    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'exampleName',
          desc: 'exampleDesc',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('12345');
        },
      };

      let galleryListCtrl = this.$componentController('galleryList', null, mockBindings);

      galleryListCtrl.deleteDone({galleryData: galleryListCtrl.gallery});

      this.$rootScope.$apply();
    });
  });

  describe('testing galleryListCtrl.deleteGallery()', () => {

    it('should call galleryListCtrl.deleteGallery', () => {
      let url = 'http://localhost:3000/api/gallery/12345';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json, text/plain, */*',
      };

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'exampleName',
          desc: 'exampleDesc',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.gallery._id).toEqual('12345');
        },
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryListCtrl = this.$componentController('galleryList', null, mockBindings);
      galleryListCtrl.deleteGallery();

      this.$rootScope.$apply();
      this.$httpBackend.flush();
    });
  });
});
