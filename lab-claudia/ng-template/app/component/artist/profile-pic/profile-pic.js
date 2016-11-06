'use strict';

require('./_profile-pic.scss');

module.exports = {
  template: require('./profile-pic.html'),
  controller: ['$log', 'picService', profilePicController],
  controllerAs: 'profilePicCtrl',
};

function profilePicController($log, picService) {
  $log.debug('init profilePicCtrl');
  this.pic = {},
  this.done = function(){
    this.pic.file = null;
  };

  this.uploadPic = function(){
    picService.uploadArtistPic(this.artist, this.pic)
    .then(() => {
      this.done();
    });
  };
}
