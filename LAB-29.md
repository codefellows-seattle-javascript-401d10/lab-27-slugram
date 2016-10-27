![cf](http://i.imgur.com/7v5ASc8.png) lab-29-slugram
====

# To Submit this Assignment
* continue working from lab 27
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a question and observation on canvas

# Description
Today you will componentize your gallery navigation

# Directions
* create a component for displying gallery info and an edit gallery form
 * it should be configured to pass a gallery object into it, using one way data binding
 * it should also have a button that will trigger a **DELETE** request to the slugram API and remove the current gallery info component from the screen
* create an edit gallery component that will be nested in the previous gallery info component
 * the sumbit event should trigger a **PUT** request to the slugram backend updating the gallery info, and then update the view on the front end to reflect the changes

### POST `/api/gallery`
* use this route to create a gallery
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
