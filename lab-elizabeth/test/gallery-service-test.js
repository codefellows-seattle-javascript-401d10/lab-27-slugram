'use strict';

describe('testing gallery service', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend) => {

      this.authService = authService;
      authService.setToken(1234);

      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing galleryService.createGallery(galleryData)', () => {
    it('should return a gallery', () => {

      let galleryData = {
        name: 'exampleGallery',
        desc: 'memories from my beach adventure',
      };
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('5678');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it('should succeed in deleting a gallery', () => {
      //mock the request
      let galleryID = 'helloworld';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryID)
      .then(res => {
        expect(res).toBe('delete successful');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

  describe('testing galleryService.updateGallery(galleryID, newGalleryData)', () => {
    it('should update a gallery', () => {

      let newGalleryData = {
        name: 'newExampleGallery',
        desc: 'new memories from my beach adventure',
      };
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/5678', newGalleryData, headers)
      .respond(200, {_id: '5678', name: newGalleryData.name, desc: newGalleryData.desc, pics: []});

      this.galleryService.updateGallery('5678', newGalleryData)
      .then(res => {
        expect(res).toBe('update successful');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

});
