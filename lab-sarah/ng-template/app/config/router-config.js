'use strict';

//providers and services go hand in hand, providers can set default properties for services
//providers configure services
//ui view is configured by these providers
module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/join#signup');
  $urlRouterProvider.when('/' , '/join#signup');
  $urlRouterProvider.when('/signup' , '/join#signup');
  $urlRouterProvider.when('/login' , '/join#login');

  // state == route == views
  let states = [
    {
      name: 'home',
      url: '/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController',
      template: require('../view/home/home.html'),
    },
    {
      name: 'Welcome',
      url: '/join',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
  ];

//state method forces ui view to be aware of all of the possible routes/views
  states.forEach(state => {
    $stateProvider.state(state);
  });
}
