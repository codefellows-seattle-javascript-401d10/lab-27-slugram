'use strict';

describe('testing gallery service', function(){
  //beforeEach that mocks the demoApp module and mocks the service

  beforeEach(() => {
    angular.mock.module('demoApp');
    //angular is global at this point, so dont have to require it in or anything
    angular.mock.inject((authService, $window, galleryService, $httpBackend) => {
      this.authService = authService;
      this.$window = $window;
      //why do we even need to set a token?? when you call e.g. createGallery, isn't the actual authService also called from within, and thus receives a real token? which part is real and which is mockeddddddddddddddddddddddddddddddddd
      authService.setToken('1234');

      this.galleryService = galleryService;
      //$httpBackend mocks the backend
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing galleryService.createGallery', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'memories from my beach adventure',
      };
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer 1234`,
      };
      //have to test the request and the response, even though the response is mocked
      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      //if we send a post request to the above url with the galleryData and headers, we expect the server will respond with the 200 status and the gallery object
      .respond(200, {_id: '5678', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      //the code below is apparently not necessary
      .then(gallery => {
        expect(gallery._id).toBe('5678');
      })
      .catch((err) => {
        expect(err).toBe(null);
      });

      //forces $httpBackend to actually respond to the requests
      //needs to be at the end of every it statement
      this.$httpBackend.flush();
    });

  }); //end of testing createGallery

  describe('testing galleryService.fetchGalleries', () => {
    it('should return an array of galleries', () => {
      let headers = {
        //what we accept back
        Accept: 'application/json',
        Authorization: `Bearer 1234`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=dsc', headers)
      .respond(200, [{name: 'one', desc: 'a name'}]);

      this.galleryService.fetchGalleries()
      .then(galleries => {
        expect(galleries[0].name).toBe('one');
        expect(galleries[0].desc).toBe('a name');
        expect(galleries.length).toBe(1);
      });

      this.$httpBackend.flush();
    }); //end of it should return a gallery array
  }); //end of testing fetch

  describe('testing galleryService.updateGallery(galleryID)', () => {
    it('should return an updated gallery', () => {
      let galleryID = 'herro';
      let galleryData = {
        name: 'antarctica',
        desc: 'it was cold',
      };
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPUT(`http://localhost:3000/api/gallery/${galleryID}`, galleryData, headers)
      .respond(200, {_id: 'herro', name: 'antarctica', desc: 'it was cold'});

      this.galleryService.updateGallery(galleryData, galleryID)
      .then((res) => {
        expect(res).toBe('updated');
      });

      this.$httpBackend.flush();
    }); //end of it should return an updated gallery
  }); //end of describe updateGallery

  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it ('should succeed in deleting a gallery', () => {

      //mock the request
      let galleryID = 'helloworld';
      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json, text/plain, */*',
      };
      //mock the server route
      //only testing the request, not the response
      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);
      //make the request
      //fix your delete method in galleryservice
      this.galleryService.deleteGallery(galleryID);
      //flush the server mock (flush the responses from the fake server)
      this.$httpBackend.flush();
    });
  });
});
