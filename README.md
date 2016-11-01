![cf](http://i.imgur.com/7v5ASc8.png) lab-27-slugram
====

# To Submit this Assignment
* fork this repository
* write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a question and observation on canvas

# Directions
* use the **ng-template** repo as your safolding for this project
* inclde an .eslintrc
* inclde an .eslintingore
* inclde a .gitignore
 * ignore the build directory
* include a package.json
 * must have lint script
 * must have test script 
 * must have test-watch script 
 * must have build script 
 * must have build-watch script 
* inclde a webpack.config.js
 * include all the production configurations
* Create these directories to organize your code: 
 * app
 * app/config
 * app/view
  * app/view/\<your-views-dir\>
 * app/scss
 * app/scss/lib
 * app/service
 * app/component
 * app/component/\<your-component-dir\>
* create a **_theme.scss** partial 
* create a **_vendor.scss** partial
 * build bootstrap from source
* create a **main.scss** file 
 * `@import "theme"`
 * `@import "vendor"`
* create a **entry.js**
 * require your **main.scss**
 * use require.context to add all of your angular construct definitions

## Requirements
* create two views `/#/`, `/#/home/`
* each view should have its own controller
* the `/#/` view should be the default landing page
 * it should have a `<signup>` and `<login>` components 
* create an authService with for making http request to the slugram backend
 * should have methods for sigup and login routes
 * should have methods to get and delete a token from local storage
 * all methods should return promises
* create a signup component
  * should have its own controller and use controllerAs syntax
  * should have its on sass partial
  * should have a form with username, email, and password
  * should use the auth service to signup and store a token
  * should redirect the page to `/#/home` on success
* create a login component
  * should have its own controller and use controllerAs syntax
  * should have its on sass partial
  * should have a form with username and password
  * should use the auth service to login and store a token
  * should redirect the page to `/#/home` on success
