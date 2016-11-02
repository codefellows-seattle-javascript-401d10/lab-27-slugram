'use strict';

describe('testing auth service', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, $rootScope, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing authService.setToken', () => {
    it('should set a token', () => {
      let token = '1234';

      this.authService.setToken(token)
      .then(token => {
        expect(token).toBe('1234');
        expect(this.$window.localStorage.getItem('service.token').toBe(token));
      });
    }); //end of it should return a token
  }); //end of describe testing setToken

  describe('testing authService.getToken', () => {
    it('should get a token', () => {
      this.authService.token = '1234';
      this.authService.getToken()
      .then(token => {
        expect(token).toBe('1234');
      });
      //most angular constructs allow for changes to be noticed immediately, but since we're in jasmine, have to actually call apply so that any changes in two way  bound objects will be noticed
      this.$rootScope.$apply();
    }); //end of it should get a token

    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('service.token', '1234');
      // this.authService.token = '1234';
      this.authService.getToken()
      .then(token => {
        expect(token).toBe('1234');
      })
      .catch(err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing authService.logout', () => {
    it('should not return a token', () => {
      this.authService.token = '1234';
      this.authService.logout()
      .then((res) => {
        expect(res).toBeFalsy;
        expect(this.$window.localStorage.getItem('service.token').toBe(null));
      });
    }); //end of it should not return a token
  });

  describe('testing authService.signup(user)', () => {
    it('should return a token', () => {
      let exampleUser = {
        username: 'prungy',
        email: 'prungy@dog.com',
        password: 'ilovefood',
      };
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', exampleUser, headers)
      .respond(200, {});

      this.authService.signup(exampleUser)
      .then((token) => {
        expect(token).toBeTruthy;
        expect(this.$window.localStorage.getItem('service.token').toBeTruthy);
      });

      this.$httpBackend.flush();
    }); //end of it should set a token
  });

  describe('testing authService.login(user)', () => {
    it('should return a token', () => {
      this.authService.token = '1234';
      let exampleUser = {
        username: 'prungy',
        password: 'ilovefood',
      };

      let base64 = this.$window.btoa(`${exampleUser.username}:${exampleUser.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, 'faketoken1234');

      this.authService.login(exampleUser)
      .then(token => {
        expect(token).toBe('faketoken1234');
      })
      .catch((err) => {
        expect(err).toBe(null);
      });
      this.$httpBackend.flush();
    });
  });
});
