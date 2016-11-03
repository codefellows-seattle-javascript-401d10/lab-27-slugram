// 'use strict';
//
// describe('testing upload pic controller', function(){
//   beforeEach(() => {
//     angular.mock.module('demoApp');
//     angular.mock.inject(($rootScope, $componentController, Upload, authService) => {
//       authService.setToken('4747');
//       this.authService = authService;
//       this.$rootScope = $rootScope;
//       this.$componentController = $componentController;
//       // this.$httpBackend = $httpBackend;
//       this.Upload = Upload;
//     });
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   // afterEach(() => {
//   //   this.$httpBackend.verifyNoOutstandingExpectation();
//   //   this.$httpBackend.verifyNoOutstandingRequest();
//   // });
//
//   describe('testing #uploadPic', () => {
//     let url = 'http://localhost:3000/api/gallery/47/pic';
//     let headers = {
//       Authorization: 'Bearer 4747',
//       Accept: 'application/json',
//     };
//     let method = 'POST';
//     let data = {
//       name: 'china',
//       desc: 'town',
//       file: 'chinatown.jpg',
//     };
//
//
//     let mockBindings = {
//       gallery: {
//         name: 'poop',
//         desc: 'on a stick',
//       },
//     };
//
//     //override upload method on Upload, for mocking purposes
//     this.Upload.upload = function(url, headers, method, data){
//       expect(url).toBe('http://localhost:3000/api/gallery/47/pic');
//       // expect(headers).toBe()
//     };
//
//     let uploadPicCtrl = this.$componentController('uploadPic', null, mockBindings);
//
//     uploadPicCtrl.pic = data;
//
//     uploadPicCtrl.uploadPic();
//   });
// });
