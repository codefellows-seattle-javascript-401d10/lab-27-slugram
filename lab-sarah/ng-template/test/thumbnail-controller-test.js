'use strict';

describe('testing thumbnail controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, Upload, authService, picService) => {
      authService.setToken('474747');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.picService = picService;
      this.Upload = Upload;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
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

      //to delete a pic, you need the gallery and the pic id
      //all you really want to test from the photo upload is that if you give it certain info, that info is spit out correctly....?
      this.$httpBackend.flush();
    }); //end of it should delete a picture
  });

});
