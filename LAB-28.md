![cf](http://i.imgur.com/7v5ASc8.png) lab-27-slugram
====

# To Submit this Assignment
* continue working from lab 27
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a question and observation on canvas

# Description
Today you will implement full curd of the gallery resource using the slugram API.

# Directions
* create a galleryService with methods to create, read, update, and delete galleries using the slugram api
 * docs for the routes are below
* create a component for createing galleries 
 * it should be a form
 * each input include a `uib-tooltip`
 * help @ [ui bootstrap docs](https://angular-ui.github.io/bootstrap/)
* in the HomeController for the `/#/home` route
 * fetch all user gallerys on page load useing `$rootScope.$on('$locationChangeSucces`, () => { ...`
 * fetch all uesr gallerys on homeCtrl initialization
 * upon reciving galleries from the backend store them in a property on the homeCtrl
* in the home.html template from the `/#/home` route
 * use ng-repeat to display all the gallery data
 * add the abbilty to delete and update each gallery

## Route Docs
