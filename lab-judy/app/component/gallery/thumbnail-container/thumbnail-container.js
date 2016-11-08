'use strict';

require('./_thumbnail-container.scss');

module.exports = {
  template: require('./thumbnail-container.html'),
  controller: ['$log', 'picService', ThumbnailContainerController],
  controllerAs: 'thumbnailContainerCtrl',
  bindings: {
    gallery: '<',
  },
};

function ThumbnailContainerController(){
  //trying to figure out how to get this to hide and show according to the clicking of pic glyphicon
  this.showThumbnailContainer = false;
}
