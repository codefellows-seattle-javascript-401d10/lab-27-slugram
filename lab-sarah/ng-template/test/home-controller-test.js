// 'use strict';
//
// describe('testing home controller', function(){
//   beforeEach(() => {
//     angular.mock.module('demoApp');
//     angular.mock.inject(($rootScope, $componentController, $httpBackend, authService ) => {
//       authService.setToken('4747');
//       this.authService = authService;
//       this.$rootScope = $rootScope;
//       this.$componentController = $componentController;
//       this.$httpBackend = $httpBackend;
//     });
//   });
//
//   afterEach(() => {
//     this.$httpBackend.verifyNoOutstandingExpectation();
//     this.$httpBackend.verifyNoOutstandingRequest();
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   describe('testing #fetchGalleries', function(){
//     it('should make a valid GET request', () => {
//       let url = 'http://localhost:3000/api/gallery?sort=dsc';
//
//       let headers = {
//         Accept: 'application/json',
//         Authorization: 'Bearer 4747',
//       };
//
//
//       this.$httpBackend.expectGET(url, headers)
//       //what we expect the backend to respond with
//       .respond(200, []);
//
//       let homeCtrl = this.$componentController('home', null);
//       homeCtrl.galleries = [];
//
//       homeCtrl.fetchGalleries()
//       .then((res) => {
//         console.log('res', res);
//       })
//       .catch((err) => {
//         console.log('err', err);
//       });
//
//       this.$httpBackend.flush();
//       this.$rootScope.$apply();
//     });
//   });
// });
