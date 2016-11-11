'use strict';

describe('testing thumbnail controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService, picService) => {
      authService.setToken('474747');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.picService = picService;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });


  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        _id: '47',
        name: 'starbursts',
        desc: 'are better than skittles imo',
        pics: [],
      },
      pic: {
        _id: '1234',
        name: 'skittles',
        desc: 'are good too though',
      },
    };

    let thumbnailCtrl = this.$componentController('thumbnail', null, mockBindings);
    expect(thumbnailCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(thumbnailCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    expect(thumbnailCtrl.gallery.pics.length).toEqual(mockBindings.gallery.pics.length);
    expect(thumbnailCtrl.pic.name).toEqual(mockBindings.pic.name);

    this.$rootScope.$apply();
  });

  describe('testing #deletePic', () => {
    it('should delete a picture', () => {
      let url = 'http://localhost:3000/api/gallery/47/pic/1234';
      let mockBindings = {
        gallery: {
          _id: '47',
          name: 'starbursts',
          desc: 'are better than skittles imo',
          pics: [],
        },
        pic: {
          _id: '1234',
          name: 'skittles',
          desc: 'are good too though',
        },
      };

      let headers = {
        Authorization: 'Bearer 474747',
        'Accept': 'application/json, text/plain, */*',
      };

      //the server expects url and headers, if it's not actually what we told the server it would be, it will fail the test
      this.$httpBackend.expectDELETE(url, headers)
      .respond(204);

      let thumbnailCtrl = this.$componentController('thumbnail', null, mockBindings);

      thumbnailCtrl.deletePic();

      this.$httpBackend.flush();
    }); //end of it should delete a picture
  });
});
