'use strict';

describe('testing home-controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($log, $rootScope, $controller, $httpBackend, authService) => {

      authService.setToken('1234');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$controller = $controller;
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

  describe('testing homeCtrl#fetchGalleries()', () => {
    it('should return a gallery and set currentGallery to index[0]', () => {
      let galleries = [
        {
          name: 'exampleGallery1',
          desc: 'yahoo',
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

      this.$httpBackend.whenGET('http://localhost:3000/api/gallery/?sort=dsc', headers)
      .respond(200, galleries);

      let homeCtrl = this.$controller('HomeController', null);

      homeCtrl.fetchGalleries()
      .then((res) => {
        expect(res).toEqual(galleries);
        expect(res[0]).toEqual(homeCtrl.currentGallery);
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });


});
