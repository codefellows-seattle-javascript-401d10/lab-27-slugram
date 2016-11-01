'use strict';

describe('testing galleryService', function(){
  // beforeEach that mocks the demoApp module and services
  beforeEach(() => {
    // first we mock the demoApp to get access to services
    // angular is a global, so it doesn't have to be required in (done in the .eslintrc file)
    // mock is loaded in karma config - inject is a method that can inject services
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend) => {
      // need to mock a token for requests to work
      this.authService = authService;
      authService.setToken('1234');
      // mock a gallery service and back end
      this.galleryService = galleryService; // service has been returned
      // want the tests to run independently of backend
      // $httpBackend - our backend has to be turned off for this to work
      // expectGET(POST...)(url, [headers], [keys])
      this.$httpBackend = $httpBackend;
    });
  });
  describe('testing galleryService.createGallery()', () => {
    it('should return a gallery', () => {
      // Mocking the data and headers
      // when backend makes request, it should have this data
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };
      // set up test headers
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234', //only testing if they send us a token
      };
      // expect that a POST request is made to the expected url with expected data and headers
      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      // it should respond with the correct information
      // this is what the backend would actually send you
      .respond(200, {_id:'5678', username:'loom', name: 'galleryData.name', desc: galleryData.desc, pics: []});

      // make the request to the backend
      this.galleryService.createGallery(galleryData);
      //flush the backend
      this.$httpBackend.flush();
    });
  });
  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it('should succeed in deleting gallery', () => {
      // 1. mock the request
      let galleryID = 'helloworld';
      let headers = {
        // delete route has no content type
        Authorization: 'Bearer 1234', //only testing if they send us a token
        Accept: 'application/json, text/plain, */*',
      };
      // 2. mock server route
      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      // use gallery/helloworld because that is the test ID we set
      .respond(204);
      // 3. make request
      this.galleryService.deleteGallery(galleryID);
      // 4. flush the server mock
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.fetchGalleries()', () => {
    it('should return galleries', () => {
      // 1. mock the request
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };
      // 2. mock server route
      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=desc', headers)
      // use gallery/helloworld because that is the test ID we set
      .respond(202);
      // 3. make request
      this.galleryService.fetchGalleries();
      // 4. flush the server mock
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.updateGallery(galleryData, galleryID)', () => {
    it('should return updated gallery', () => {
      // 1. mock the request
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };
      let galleryID = 'helloworld';
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };
      // 2. mock server route
      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/helloworld', galleryData, headers)
      // use gallery/helloworld because that is the test ID we set
      .respond(202);
      // 3. make request
      this.galleryService.updateGallery(galleryData, galleryID);
      // 4. flush the server mock
      this.$httpBackend.flush();
    });
  });

}); // end first describe block
