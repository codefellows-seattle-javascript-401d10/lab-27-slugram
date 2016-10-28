'use strict';

// Build sass - gets custom bootstrap and theme
require('./scss/main.scss');

// Require node modules
const path = require('path');

// Require npm modules
const angular = require('angular'); //create angular module
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// Require angular modules
// Injected in modules to do routing and bootstrap
const ngTouch = require('angular-touch'); // Dependency of bootstrap
const ngAnimate = require('angular-animate'); // Dependency of bootstrap
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap'); // Need touch and animate to use

// Create angular module
// Add everything we need to module
const demoApp = angular.module('demoApp', [ngTouch, ngAnimate, uiRouter, uiBootstrap]);

// Load config
// Returns object that has files that match regex in the
// config directory and loads it in
let context = require.context('./config/', true, /.js$/);
// key -absolute path of where file was found
context.keys().forEach( path => {
  demoApp.config(context(path));
});

// Load view controllers
context = require.context('./view/', true, /.js$/); //looks in view for directories ending in js
context.keys().forEach( key => {
  // for every key, take path, and get the base name(home-controller)
  // pascalcase turns it into HomeController
  let name = pascalcase(path.basename(key, '.js')); // name controller based on file name
  // pass in path into context -returns what was exported
  let module = context(key); // value of module.exports
  demoApp.controller(name, module);
});

// Load services
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  demoApp.service(name, module);
});

// Load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  demoApp.component(name, module);
});
