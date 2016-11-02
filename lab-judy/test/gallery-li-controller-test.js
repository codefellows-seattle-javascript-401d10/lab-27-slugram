'use strict';

describe('testing gallery-li controller', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, authService, $httpBackend) => {
      authService.setToken('1234');
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

  describe('testing #deleteDone', () => {

    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '5678',
          name: 'judy',
          desc: 'vue',
          pics: [],
        },
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('5678');
        },
      };

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLICtrl.deleteDone({galleryData: galleryLICtrl.gallery});

      this.$rootScope.$apply();

    });
  });

  it('should call #deleteDone with gallery after #deleteGallery', () => {
    let url = 'http://localhost:3000/api/gallery/5678';

    let headers = {
      Authorization: 'Bearer 1234',
      Accept: 'application/json',
    };

    let mockBindings = {
      gallery: {
        _id: '5678',
        name: 'hello',
        desc: 'infomative',
        pics: [],
      },

      deleteDone: function(data){
        expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
      },
    };

    this.$httpBackend.expectDELETE(url, headers)
    .respond(204);

    let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
    galleryLICtrl.deleteGallery();

    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });


});
