'use strict';

describe('testing auth service', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $window, $httpBackend) => {
      this.$window = $window;
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
      this.authService.setToken('1234')
      .then(() => {
        this.authService.getToken()
        .then(token => {
          expect(token).toBe('1234');
        });
      });
    }); //end of it should get a token
  });

  describe('testing authService.logout', () => {
    it('should not return a token', () => {
      this.authService.setToken('1234')
      .then(() => {
        this.authService.logout()
        .then((res) => {
          expect(res).toBeFalsy;
          expect(this.$window.localStorage.getItem('service.token').toBe(null));
        });
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
      .respond(200);

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
      let sameUser = {
        username: 'prungy',
        password: 'ilovefood',
      };
      this.$httpBackend.expectGET('http://localhost:3000/api/login')
      .respond(200);

      this.authService.login(sameUser)
      .then((token) => {
        console.log('token', token);
        expect(token).toNotBe(null);
      });

      this.$httpBackend.flush();
    });
  });
});
