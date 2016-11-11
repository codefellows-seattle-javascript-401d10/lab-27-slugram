'use strict';

//this has to have a bindings gallery object, so you can keep track of the gallery that was last clicked, and that will be the one shown in this thumbnail-container
module.exports = {
  template: require('./thumbnail-container.html'),
  controllerAs: 'thumbnailContainerCtrl',
  //takes in a allery via one way data bindings
  //bindings defines an attribute 'gallery' in the html
  //assings gallery on the scope of the thumbnailContainer
  bindings: {
    gallery: '<',
  },
};
