'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/');

  let states = [
    {
      name: 'home',
      url: '/home',
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      template: require('../view/home/home.html'),
    },
    {
      name: 'landing',
      url: '/',
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
      template: require('../view/landing/landing.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
