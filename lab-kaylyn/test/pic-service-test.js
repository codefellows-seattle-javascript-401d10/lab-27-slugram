'use strict';

describe('testing picService', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, picService, $httpBackend) => {
      this.galleryService = galleryService;
      this.picService = picService;
      authService.setToken('1234');

      this.picService = picService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing picService.uploadGalleryPic()', () => {
    it('should return an uploaded picture', () => {

      let galleryData = {
        id: galleryData._id,
        name: 'exampleGallery',
        desc: 'exampleDesc',
      };

      let picData = {
        name: 'examplePcName',
        desc: 'examplePicDesc',
        file: 'exampleFile',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery/galleryData._id/pic', galleryData, picData, headers)
      .respond(200, {_id: '666', name:'examplePicName', desc: 'examplePicDesc', file:''});

      this.picService.uploadGalleryPic(picData)
      .then(data => {
        expect(data.length).toBe(1);
      });
      this.$httpBackend.flush();
    });
  });
});
