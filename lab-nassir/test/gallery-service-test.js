'use strict';

describe('Testing galleryService', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $window, $httpBackend) => {
      this.authService = authService;
      authService.setToken('1234');
      this.galleryService = galleryService;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
    });
  });

  // afterEach(() => {
  //   this.authService.setToken(null);
  //   this.$window.localStorage.clear();
  // });

  describe('Testing galleryService.createGallery()', () => {
    it('Should return a gallery', () => {
      let exampleGallery = {
        name: 'exampleGallery',
        desc: 'Nothing but cats wearing clothes like people',
      };
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', exampleGallery, headers)
      .respond(200, {_id: '5678', name: exampleGallery.name, desc: exampleGallery.desc, pics: []});

      this.galleryService.createGallery(exampleGallery)
      .then(gallery => {
        expect(gallery._id).toBe('5678');
        expect(Array.isArray(gallery.pics)).toBe(true);
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
    });
  });

  describe('Testing galleryService.fetchGalleries', () => {
    it('Should return an array of galleries and a 200 status', () => {
      let galleryArray = [];

      for (var i = 0; i < 50; ++i) {
        galleryArray.push({
          name: `galleryName${i}`,
          desc: `galleryDesc${i}`,
        });
      }

      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery', headers)
      .respond(200, galleryArray);

      this.galleryService.fetchGalleries()
      .then(array => {
        expect(Array.isArray(array)).toBe(true);
        expect(array.length).toBe(50);
        expect(array[0].name).toBe(galleryArray[0].name);
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
    });
  });

  describe('Testing galleryService.updateGalleries', () => {
    it('Should return an updated gallery object and a status of 200', () => {
      let galleryID = '5678';
      let exampleGallery = {
        name: 'exampleGallery',
        desc: 'Nothing but cats wearing clothes like people',
      };
      let updatedExampleGallery = {
        name: 'updatedGallery',
        desc: 'Now includes dogs in capes like superheroes!!',
      };
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', exampleGallery, headers)
      .respond(200, {_id: '5678', name: exampleGallery.name, desc: exampleGallery.desc, pics: []});

      this.$httpBackend.expectPUT(`http://localhost:3000/api/gallery/${galleryID}`, updatedExampleGallery, headers)
      .respond(200, {_id: '5678', name: updatedExampleGallery.name, desc: updatedExampleGallery.desc, pics: []});

      this.galleryService.createGallery(exampleGallery)
      .then(gallery => {
        return this.galleryService.updateGalleries(gallery._id, updatedExampleGallery);
      })
      .then(newGallery => {
        expect(newGallery.name).toBe(updatedExampleGallery.name);
        expect(newGallery.desc).toBe(updatedExampleGallery.desc);
        expect(Array.isArray(newGallery.pics)).toBe(true);
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
    });
  });

  describe('Testing galleryService.deleteGalleries()', () => {
    it('Should return a status of 204 and nothing else', () => {
      let galleryID = '5678';
      let exampleGallery = {
        name: 'exampleGallery',
        desc: 'Nothing but cats wearing clothes like people',
      };
      let postHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };
      let deleteHeaders = {
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', exampleGallery, postHeaders)
      .respond(200, {_id: '5678', name: exampleGallery.name, desc: exampleGallery.desc, pics: []});

      this.$httpBackend.expectDELETE(`http://localhost:3000/api/gallery/${galleryID}`, deleteHeaders)
      .respond(204);

      this.galleryService.createGallery(exampleGallery)
      .then(gallery => {
        return this.galleryService.deleteGalleries(gallery._id);
      })
      .then(res => {
        console.log(res);
      });

    });
  });

});
