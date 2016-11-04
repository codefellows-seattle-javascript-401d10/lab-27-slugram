'use strict';

describe('testing edit-gallery controller', function() {
  var url = 'http://localhost:3000/api/signup';

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, authService, $componentController, $httpBackend, $location) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();  
  });

  describe('testing signup', () => {
    it('it should create a user', () => {
      let user = {
        name: 'lulwat', 
        password: '1234',
        username: 'rozi',
      };
      
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST(url, user, headers)
      .respond(200, {_id:'23770504', username: 'Rozi',  name: 'lulwat', password:'1234'});

      let signupCtrl = this.$componentController('signup');

      signupCtrl.signup(user);
      this.$httpBackend.flush();
      this.$rootScope.$apply();

      expect(this.$location.path()).toBe('/home');
    });
  });
});