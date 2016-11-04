'use strict';

describe('testing thumbnail container controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'starbursts',
        desc: 'are delicious',
      },
    };

    let thumbnailContainerCtrl = this.$componentController('thumbnailContainer', null, mockBindings);
    expect(thumbnailContainerCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(thumbnailContainerCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    this.$rootScope.$apply();
  });
});
