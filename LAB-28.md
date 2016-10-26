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
> Use these docs a a refrence to make your requests to the slugram api  

### POST `/api/gallery`
* this route to create a gallery
* headers required
 * `Authorization` :  `Bearer <token>`
 * `Accept` :  `application/json`
 * `Content-Type` :  `application/json`
* Body requirements
 * name: **String**
 * desc: **String**  
* 200 response
 * an object with the data for the gallery that was just created
 
### GET `/api/gallery`
* use this route to get an array of all of a users galleries
* headers required
 * `Authorization` :  `Bearer <token>`
 * `Accept` :  `application/json`
* 200 response
 * an array of the last 50 gallerys created by the user   

### PUT `/api/gallery/<galleryID>`
* use this route to update an gallery with new info
* headers required
 * `Authorization` :  `Bearer <token>`
 * `Accept` :  `application/json`
 * `Content-Type` :  `application/json`
* there are no body requirements
* 200 response
 * an object with the data for the gallery that was just updated

### DELETE  `/api/gallery/<galleryID>`
* use this route to delete a gallery
* headers required
 * `Authorization` :  `Bearer <token>`
 * `Accept` :  `application/json`
* 204 response
 * no content
