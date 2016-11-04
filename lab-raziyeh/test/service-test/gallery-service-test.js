'use strict';

describe('testing gallery service', function() {
  var url = 'http://localhost:3000/api';
  let galleryData = {
    name: 'documents',
    desc: 'all notes from my interviews',
  };

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend, $window) => {
      this.authService = authService;
      authService.setToken('1234');

      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing galleryService.createGallery', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'documents',
        desc: 'all notes from my interviews',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(`${url}/gallery`, galleryData, headers)
      .respond(200, {_id:'23770504', username: 'Rozi',  name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('23770504');
        expect(gallery.name).toBe(galleryData.name);
        expect(gallery.desc).toBe(galleryData.desc);
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.fetchGalleries', () => {
    let galleries = [
      {
        name: 'documents',
        desc: 'all notes from my interviews',
      },
      {
        name: 'documents2',
        desc: 'all notes from my interviews',
      },
      {
        name: 'documents3',
        desc: 'all notes from my interviews',
      },

    ];
      
    it('should return a gallery', () => {
      
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectGET(`${url}/gallery/`, headers)
      .respond(200, galleries);

      this.galleryService.fetchGalleries()
      .then(galleries => {
        expect(galleries.length).toBe(3);
        expect(galleries[0].name).toBe(galleries[0].name);
        expect(galleries[0].desc).toBe(galleries[0].desc);
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.updateGallery', () => {    
    it('should update a gallery', () => {
      let galleryId = '1000',
        headers = {
          'Content-Type':'application/json',
          Accept: 'application/json',
          Authorization:'Bearer 1234',
        };
      this.$httpBackend.expectPUT(`${url}/gallery/1000`, galleryData, headers)
      .respond(200,  {_id:'1000', username: 'Rozi',  name: 'updated name', desc: 'updated Desc', pics: []});

      this.galleryService.updateGallery(galleryId, galleryData)
      .then(gallery => {
        expect(gallery._id).toBe(galleryId);
        expect(gallery.name).toEqual('updated name');
        expect(gallery.desc).toEqual('updated Desc');
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.deleteGallery', () => {    
    it('should delete a gallery', () => {
      let galleryId = '1000',
        headers = {
          Authorization: 'Bearer 1234',
          Accept: 'application/json, text/plain, */*',
        };
      this.$httpBackend.expectDELETE(`${url}/gallery/1000`, headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryId);
      this.$httpBackend.flush();
    });
  });
});