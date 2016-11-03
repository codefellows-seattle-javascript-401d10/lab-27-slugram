'use strict';

describe('testing edit-gallery controller', function() {
  var url = 'http://localhost:3000/api/login';

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, authService, $componentController, $httpBackend, $location, $window) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
      this.$window = $window;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();  
  });

  describe('testing signin', () => {
    it('it should create a user', () => {
      
      let user = {
        name: 'lulwat', 
        password: '1234',
        username: 'rozi',
      };

      var base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        'Accept': 'application/json',
        Authorization:`Basic ${base64}`,
      }; 

      this.$httpBackend.expectGET(url, headers)
      .respond(200, {_id:'23770504', username: 'Rozi',  name: 'lulwat', password:'1234'});

      let signinCtrl = this.$componentController('signin');

      signinCtrl.signin(user);
      this.$httpBackend.flush();
      this.$rootScope.$apply();

      expect(this.$location.path()).toBe('/home');
    });
  });
});