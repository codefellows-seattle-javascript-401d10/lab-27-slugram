'use strict';

describe('testing create-gallery-controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #createGallery', () => {
    it('should make a valid POST request', () => {
      let url = 'http://localhost:3000/api/gallery';

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      let exampleGallery = {
        name: 'dogs',
        desc: 'in parks',
      };

      //only if your call to the controller returns something do you need to do expect statements after .createGallery, otherwise the only expect statement is below?
      this.$httpBackend.expectPOST(url, exampleGallery, headers)

      .respond(200, {name: 'dogs', desc: 'in parks', pics: [{name: 'guppies', desc: 'in puppies'}]});

      let createGalleryCtrl = this.$componentController('createGallery', null);

      //because in the CreateGalleryController in the actual js file, this.gallery = {}; so you have to set the gallery on the current controller to equal the exampleGallery
      //setting what the user inputs would have given to the model, just have to mock it
      createGalleryCtrl.gallery = exampleGallery;

      createGalleryCtrl.createGallery(exampleGallery)
      .then(() => {
        expect(createGalleryCtrl.gallery.name).toBe(null);
        expect(createGalleryCtrl.gallery.desc).toBe(null);
        expect(createGalleryCtrl.gallery.pics[0].name).toBe('guppies');
        expect(createGalleryCtrl.gallery.pics[0].desc).toBe('in puppies');
        // we could do the tests below (not null tests) IF we returned something from the createGalleryCtrl expect(gallery.name).toBe(exampleGallery.name);
        // expect(gallery.desc).toBe(exampleGallery.desc);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    }); //end of it should make POST request
  });

});
