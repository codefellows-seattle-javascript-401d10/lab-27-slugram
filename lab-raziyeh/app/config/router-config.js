'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/home',
    controllerAs: 'homeCtrl',
    controller: 'HomeController',
    template: require('../view/home/home.html'),
  })
  
  .state('welcome', {
    url: '/',
    controllerAs: 'landingCtrl',
    controller: 'LandingController',
    template: require('../view/landing/landing.html'),
  });

  $urlRouterProvider.otherwise('/');
}
