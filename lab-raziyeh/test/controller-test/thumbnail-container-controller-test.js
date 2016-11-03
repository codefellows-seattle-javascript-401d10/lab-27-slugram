'use strict';

describe('testing edit-gallery controller', function() {
  var url = 'http://localhost:3000/api/gallery';

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, authService, $componentController, $httpBackend ) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();  
  });
  
  describe('testing component', () => {
    it('testing component bindings', () => {
      let mockBindings = {
        gallery: {
          name: 'lulwat',
          desc: 'this is a test',
        },
      };

      let thumbnailContainerCtrl = this.$componentController('thumbnailContainer', null, mockBindings);
      expect(thumbnailContainerCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(thumbnailContainerCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
      this.$rootScope.$apply();
    });
  });
});