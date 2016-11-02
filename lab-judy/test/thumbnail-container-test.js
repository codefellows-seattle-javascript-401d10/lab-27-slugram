'use strict';

describe('testing thumbnail controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
    });
  });

  // afterEach(() => {
  //   this.$httpBackend.verifyNoOutstandingExpectation();
  //   this.$httpBackend.verifyNoOutstandingRequest();
  // });
  //
  // afterEach(() => {
  //   this.authService.logout();
  // });

  describe('testing thumbnail-container bindings', () =>{
    it('should return mockBindings properties', () =>{

      let mockBindings = {
        gallery: {
          name: 'judy',
          desc: 'vue',
          pics: [],
        },
      };

      let thumbnailContainerCtrl = this.$componentController('thumbnailContainer', null, mockBindings);

      expect(thumbnailContainerCtrl.gallery.name).toBe(mockBindings.gallery.name);
      expect(thumbnailContainerCtrl.gallery.desc).toBe(mockBindings.gallery.desc);

      this.$rootScope.$apply();
    });
  });

});
