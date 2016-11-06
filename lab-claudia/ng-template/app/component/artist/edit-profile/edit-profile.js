'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'artistService', editProfileController],
  controllerAs: 'editProfileCtrl',
};

function editProfileController($log, artistService) {
  $log.debug('init editProfileCtrl');

  this.updateArtist = function(){
    artistService.updateArtist(this.artist, this.artist._id);
  };
}
