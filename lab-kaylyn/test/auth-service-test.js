'use strict';

describe('testing authService', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $httpBackend) => {
      this.authService = authService;
      authService.setToken('1234');

      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing authService service.signup', () => {
    it('should return a user', () => {
      let user = {
        name: 'userName',
        email: 'userEmail',
        password: 'userPassword',
      };

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', user, headers)
      .respond(200, {token: '666'});

      this.authService.signup(user);
      this.$httpBackend.flush();
    });
  });
});
