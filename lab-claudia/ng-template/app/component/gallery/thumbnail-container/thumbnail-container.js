'use strict';

module.exports = {
  template: require('./thumbnail-container.html'),
  controllerAs: 'thumbnailContainerCtrl',
  //takes in a gallery via one way data binding
  //binding defines an attribute 'gallery' in the html
  //assigns 'gallery' on the scope of the thumbnail-conatiner
  bindings: {
    gallery: '<',
  },
};
