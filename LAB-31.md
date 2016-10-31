![cf](http://i.imgur.com/7v5ASc8.png) lab-31-slugram
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
* create a component for uploading an image to the slugram API for a specific gallery
 * on a sucessful upload add this pic to the gallery's pics array
* create a component for displaying a thumbnail for a particular pic 
 * the thumbnail should have a button that will trigger a **DELETE** request to the slugram backend and delete the photo from the gallery
* create a component for displaying the thumbnails for the photos in a gallery
 * you should be able to select one of the users galleys and its picures should be displayed using the thumnail component

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
* 204 response
 * no content  

### POST `/api/gallery/<galleryID>/pic`
* use this route to create a pic associated with a gallery
* headers required
 * `Authorization` :  `Bearer <token>`
 * `Accept` :  `application/json`
* Body requirements
 * name: **String**
 * desc: **String**  
 * file: **multipart file data**
* 200 response
 * an object with the data for the pic that was just created

### DELETE  `/api/gallery/<galleryID>/pic/<picID>`
* use this route to delete a gallery
* headers required
 * `Authorization` :  `Bearer <token>`
* 204 response
 * no content  
