'use strict';

describe('testing auth service', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    //we are injecting our services
    angular.mock.inject((authService, $q, $window, $rootScope, $httpBackend) => {

      this.authService = authService;
      //'this' refers to the current describe block, so that is where we're storing our services
      this.$q = $q;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('#getToken()', () => {
    it('should return token', () => {

      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'hello world token');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('hello world token');
      });

      //$rootScope is essentially flushing $q, it's making sure that everything's run through with $q
      this.$rootScope.$apply();
    });
  });

  describe('#getToken()', () => {
    it('should return token', () => {

      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'hello world token two');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('hello world token two');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$rootScope.$apply();
    });
  });

  // describe('#setToken', () => {
  // something
  // });

  describe('signup(user)', () => {
    it('should return a user', () => {
      let userToken = 'iva234euq73mve0934uct34906uc54us';
      let userData = {
        name: 'FiddyDiddy',
        email: 'fiddy@thediddy.com',
        password: '0987654321',
      };
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', userData, headers)
      .respond(200, userToken);

      this.authService.signup(userData)
      .then(token => {
        expect(token).toBe(userToken);
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('login(user)', () => {
    it('should get a user', () => {
      let userToken = 'iva234euq73mve0934uct34906uc54us';
      let userData = {
        name: 'FiddyDiddy',
        password: '0987654321',
      };
      let base64 = this.$window.btoa(`${userData.name}:${userData.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      .respond(200, userToken);

      this.authService.login(userData)
      .then(token => {
        expect(token).toBe(userToken);

        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
    });
  });
});
