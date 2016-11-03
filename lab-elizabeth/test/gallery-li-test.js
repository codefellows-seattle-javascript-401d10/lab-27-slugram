'use strict';

describe('testing gallery-li controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $rootScope, $httpBackend, $componentController) => {

      authService.setToken('secrettoken');
      this.authService = authService;
      
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('#deleteDone()', () => {
    it('should call deleteDone()', () => {
      let mockBindings = {
        gallery: {
          _id: '65432ONE',
          name: 'hello',
          desc: 'informative',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('65432ONE');
        },
      };

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLiCtrl.deleteDone({galleryData: galleryLiCtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone() after galleryDelete', () => {
      let url = 'http://localhost:3000/api/gallery/65432ONE';
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer secrettoken',
      };

      let mockBindings = {
        gallery: {
          _id: '65432ONE',
          name: 'hello',
          desc: 'informative',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
        },
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLiCtrl.deleteGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
