// 'use strict';

// describe('testing Pic service', function() {
//   var url = 'http://localhost:3000/api';
//   // let galleryData = {
//   //   name: 'documents',
//   //   desc: 'all notes from my interviews',
//   // };
  

//   beforeEach(() => {
//     angular.mock.module('demoApp');
//     angular.mock.inject((authService, galleryService, picService, $httpBackend) => {
//       this.authService = authService;
//       authService.setToken('1234');

//       this.galleryService = galleryService;
//       this.picService = picService;
//       this.$httpBackend = $httpBackend;
//     });
//   });

//   describe('testing picService.uploadGalleryPic', () => {
//     let gallery = {
//       _id: '111',
//       name: 'documents',
//       desc: 'all notes from my interviews',
//     };

//     it('should create a pic', () => {
//       let pic = {
//         name: 'test',
//         desc: 'test data',
//         file: `${__dirname}/data/razi.jpg`,
//       };

//       let headers = {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: 'Bearer 1234',
//       };

//       this.$httpBackend.expectPOST(`${url}/gallery/${111}/pic`, pic, headers)
//       .respond(200, { 
//         name: pic.name,
//         desc: pic.desc,
//         imageURI: 'https://gallery01.s3.amazonaws.com/e44df56e5139f271c341736e82065aae.png',
//         objectKey: 'e44df56e5139f271c341736e82065aae.png',
//         userID: '"58111458118eb6427278f8b0"',
//         username:'omidomid'});

//       this.picService.uploadGalleryPic(gallery, pic)
//       .then(data => {
//         expect(data.name).toBe(pic.name);
//       });
//       this.$httpBackend.flush();
//     });
//   });
// });