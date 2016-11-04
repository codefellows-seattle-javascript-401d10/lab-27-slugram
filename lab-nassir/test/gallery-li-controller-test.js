'use strict';

describe('Testing galleryLiCtrl', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, authService, $httpBackend) => {
      authService.setToken('tokentoken');
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$rootScope = $rootScope;
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

  describe('Testing galleryLiCtrl.deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '654321',
          name: 'hello',
          desc: 'buildings that look like cheerful faces',
          pics: [],
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('654321');
        },
      };

      let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);

      galleryLiCtrl.deleteDone({galleryData: galleryLiCtrl.gallery});

      this.$rootScope.$apply();
    });
  });


  it('should call deleteDone with deleteGallery', () => {

    let url = 'http://localhost:3000';

    let headers = {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer tokentoken',
    };


    let mockBindings = {
      gallery: {
        _id: '654321',
        name: 'Pareidolia Gallery #17',
        desc: 'buildings and barns that look like screaming faces',
        pics: [],
      },
      deleteDone: function(data) {
        expect(data.galleryData._id).toEqual('654321');
      },
    };

    let galleryLiCtrl = this.$componentController('galleryLi', null, mockBindings);

    this.$httpBackend.expectDELETE(`${url}/api/gallery/${mockBindings.gallery._id}`, headers)
    .respond(204);

    galleryLiCtrl.deleteGallery();

    this.$rootScope.$apply();
    this.$httpBackend.flush();
  });

});
