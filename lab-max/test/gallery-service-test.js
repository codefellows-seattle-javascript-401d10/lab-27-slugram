'use strict';

describe('testing gallery service', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend) => {
      this.authService = authService;
      authService.setToken('1234');
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing galleryService.createGallery()', () => {

    it('should return a gallery', () => {
      let exampleGallery = {
        name: 'exampleGallery',
        desc: 'fun times testing',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', exampleGallery, headers)
      .respond(200, {_id: '6789', name: exampleGallery.name, desc: exampleGallery.desc, pics: []});

      this.galleryService.createGallery(exampleGallery)
      .then(gallery => {
        expect(gallery._id).toBe('6789');
        expect(gallery.name).toBe(exampleGallery.name);
        expect(gallery.desc).toBe(exampleGallery.desc);
        expect(Array.isArray(gallery.pics)).toBe(true);
      });

      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.deleteGallery(galleryID)', () => {

    it('should return a successful delete', () => {
      let galleryID = 'exampleID';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json, text/plain, */*',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/exampleID', headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryID);

      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.fetchGalleries()', () => {

    it('should return an array of galleries', () => {
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      let galleryArray = [
        {
          name: '1',
          desc: '2',
        },
        {
          name: 'example',
          desc: 'example',
        }];

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery?sort=dsc', headers)
      .respond(200, galleryArray);

      this.galleryService.fetchGalleries()
      .then(galleries => {
        expect(galleries.length).toBe(2);
        expect(galleries[0]).toEqual({name: '1', desc: '2'});
      });

      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.updateGallery(galleryID, galleryData)', () => {

    it('should respond with an updated gallery', () => {
      let galleryID = 'exampleID';
      let galleryData = {
        name: 'updateGallery',
        desc: 'this should update',
      };
      let headers = {
        Authorization: 'Bearer 1234',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/exampleID', galleryData, headers)
      .respond(200, {_id: galleryID, name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.updateGallery(galleryID, galleryData)
      .then(gallery => {
        expect(gallery.name).toBe(galleryData.name);
        expect(gallery.desc).toBe(galleryData.desc);
        expect(gallery._id).toBe(galleryID);
        expect(Array.isArray(gallery.pics)).toBe(true);
      });

      this.$httpBackend.flush();
    });
  });
});
