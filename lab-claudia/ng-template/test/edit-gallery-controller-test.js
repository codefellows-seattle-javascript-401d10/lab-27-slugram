'use strict';

describe('testing edit-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      authService.setToken('1234');
      this.authService = authService;
    });
  });
  afterEach(() => {
    // calling logout removes token from local storage!
    this.authService.logout();
    // throws error if you set up an expect statement to make a request but the request wasn't made
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });
  it('should component bindings', () => {
    // set up object to be passed in
    let mockBindings = {
      gallery: {
        name: 'goose',
        desc: 'lary',
      },
    };
    // Mock the gallery
    // pass in name of component
    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    // console.log('editGalleryCtrl', editGalleryCtrl);
    expect(editGalleryCtrl.gallery.name).toEqual('goose');
    expect(editGalleryCtrl.gallery.desc).toEqual('lary');
    this.$rootScope.$apply();
  });
});

describe('testing #update-gallery', () => {
  it('should make a valid PUT request', () => {
    let url = 'http://localhost:3000/api/gallery/12345';
    // Mock headers
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 1234',
    };

    // Mock object to be passed in via bindings
    let mockBindings = {
      gallery: {
        _id: '12345',
        name: 'goose',
        desc: 'lary',
        pics: [],
      },
    };
    // Mock component - create an instance of component with the mocked bindings
    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    // Mock updated name
    editGalleryCtrl.gallery.name = 'newname';

    // Mock server route
    this.$httpBackend.expectPUT(url, {_id: '12345', name:'newname', desc:'lary'}, headers)
    .respond(200);

    // Flush the backend - tells httpBackend to respond to the request
    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });
});
