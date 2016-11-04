// 'use strict';
//
// describe('Testing uploadPicCtrl', function() {
//   beforeEach(() => {
//     angular.mock.module('demoApp');
//     angular.mock.inject((authService, $componentController, $rootScope, $httpBackend) => {
//       authService.setToken('1234');
//       this.authService = authService;
//       this.$rootScope = $rootScope;
//       this.$componentController = $componentController;
//       this.$httpBackend = $httpBackend;
//     });
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   describe('Testing uploadPicCtrl.uploadGalleryPic', () => {
//     it('should pretend to upload a pic', () => {
//       let mockBindings = {
//         gallery: {
//           _id: '12345',
//           name: 'Dumb Varmints',
//           desc: 'politicians amirite?',
//         },
//       };
//
//       let headers = {
//         Authorization: 'Bearer 1234',
//         Accept: 'application/json',
//       };
//
//       let uploadPicCtrl = this.$componentController('uploadPic', null, mockBindings);
//
//       uploadPicCtrl.pic = {
//         name: 'Mitt BOMBney',
//         desc: 'still better than trump',
//         file: 'somefile.jpg',
//       };
//
//       this.$httpBackend.expectPOST(`http://localhost:3000/api/gallery/${mockBindings.gallery._id}/pic/`, uploadPicCtrl.pic, headers)
//       .respond(200, {name: 'Mitt BOMBney', desc: 'still better than trump', file: 'somefile.jpg'});
//
//       let Upload.upload = function()
//
//       uploadPicCtrl.uploadPic();
//
//       this.$rootScope.$apply();
//       this.$httpBackend.flush();
//     });
//   });
// });
