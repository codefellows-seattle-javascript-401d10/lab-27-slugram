'use strict';

describe('testing gallery service', function(){

  // beforeEach mocks the demoApp module
  //            mocks the service

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend, $window, $rootScope) => {
      this.authService = authService;
      authService.setToken('1234');

      this.galleryService = galleryService;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  //POST /api/gallery
  describe('testing POST galleryService.createGallery', () => {
    it('should return a gallery', () => {
      let galleryData = {
        name: 'exampleGallery',
        desc: 'memories from my beach adventure',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte',  name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
    });
  });

  //POST /api/signup (authService)
  describe('testing  POST user signup at /api/signup', () => {
    it('should succesfully create a new user', () => {
      let userData = {
        name: 'Judy',
        username: 'fakeUser',
        password: 'ABCD',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', userData, headers)
      .respond(200, '1234');

      this.authService.signup(userData)
      .then((token) => {
        expect(token).toBe('1234');
      });

      this.$httpBackend.flush();
    });
  });

  //GET /api/login (authService)
  describe('testing GET user login at /api/login', () => {
    it('should login an existing user', () => {
      let userData = {
        name: 'Judy',
        username: 'fakeUser',
        password: 'ABCD',
      };

      let base64 = this.$window.btoa(`${userData.username}:${userData.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, '1234');

      this.authService.login(userData)
      .then((token) => {
        expect(token).toBe('1234');
      });

      this.$httpBackend.flush();
    });
  });

  //Testing setToken method (authService)
  describe('testing #service.setToken', () => {
    it('should return a new token', () => {


      this.authService.setToken('1234')
      .then((token) => {
        expect(token).toEqual('1234');
      })
      .catch((err) => {
        console.error(err);
      });
      this.$rootScope.$apply();
    });
  });

  //Testing getToken method (authService)
  describe('testing #service.getToken', () => {
    it('should retrieve a token from localStorage', () => {

      this.$window.localStorage.setItem('service.token', '1234');

      this.authService.getToken()
      .then((token) => {
        expect(token).toBe('1234');
      });
      this.$rootScope.$apply();
    });
  });

  //GET /api/gallery
  describe('testing GET a user\'s galleries at /api/gallery', () => {
    it('should return a user\'s galleries as array', () => {

      let galleries = [
        {
          name: 'exampleGallery1',
          desc: 'yohoo',
        },
        {
          name: 'exampleGallery2',
          desc: 'wee',
        },
      ];

      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=dsc', headers)
      .respond(200, galleries);

      this.galleryService.fetchGalleries()
      .then((res) => {
        expect(res).toEqual(galleries);
      });

      this.$httpBackend.flush();
    });
  });

  //PUT /api/gallery/galleryID
  describe('testing PUT to /api/gallery/galleryID', () => {
    it('should update a user\'s gallery', () => {

      let gallery = {
        name: 'exampleGallery1',
        desc: 'yohoo',
      };


      let headers = {
        Authorization: 'Bearer 1234',
        Accept: 'application/json',
        'Content-Type':'application/json',
      };

      this.$httpBackend.expectPUT('http://localhost:3000/api/gallery/helloworld', gallery, headers)
      .respond(200, {_id: 'helloworld', username: 'slugbyte',  name: gallery.name, desc: gallery.desc, pics: []});

      this.galleryService.updateGallery('helloworld', gallery)
      .then((res) => {
        expect(res).toEqual({_id: 'helloworld', username: 'slugbyte',  name: gallery.name, desc: gallery.desc, pics: []});
      });

      this.$httpBackend.flush();
    });
  });
  //DELETE /api/gallery/galleryID
  describe('testing DELETE to /api/gallery/galleryID', () => {
    it('should delete a user\'s gallery', () => {

      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);

      this.galleryService.deleteGallery('helloworld')
      .then((res) => {
        expect(res).toEqual(undefined);
      });

      this.$httpBackend.flush();
    });
  });



});
