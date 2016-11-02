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

  describe('createGallery(galleryData)', () => {
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
      .respond(200, {_id: 'helloworld', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('helloworld');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

  describe('deleteGallery(galleryID)', () => {
    it('should delete a gallery', () => {

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

  describe('updateGallery(galleryID, newGalleryData)', () => {
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

      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/helloworld', newGalleryData, headers)
      .respond(200, {_id: 'helloworld', name: newGalleryData.name, desc: newGalleryData.desc, pics: []});

      this.galleryService.updateGallery('helloworld', newGalleryData)
      .then(res => {
        expect(res).toBe('update successful');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

  describe('fetchGalleries()', () => {
    it('should fetch galleries array', () => {
      let galleries = [
        {
          name: 'exampleGallery',
          desc: 'memories from my beach adventure',
        },
        {
          name: 'newExampleGallery',
          desc: 'new memories from my beach adventure',
        },
      ];
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=dsc', headers)
      .respond(200, galleries);

      this.galleryService.fetchGalleries()
      .then(res => {
        expect(res).toEqual(galleries);
      });

      this.$httpBackend.flush();

    });
  });

});
