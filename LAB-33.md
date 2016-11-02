![cf](http://i.imgur.com/7v5ASc8.png) lab-32-slugram
====

# To Submit this Assignment
* continue working from lab 27
* push to your repository
* submit a pull request to this repository
* submit a link to your PR in canvas
* write a question and observation on canvas

# Description
Today you will write service tests

# TEST
* Write tests for four of your component controllers

## Bonus
* **2p** Write test for home controller and landing controller 

### POST `/api/signup`
* use this route to create a user
* headers required
 * `Accept` :  `application/json`
 * `Content-Type` :  `application/json`
* Body requirements
 * name: **String**
 * username: **String**  
 * password: **String**  
* 200 response
 * a token

### GET `/api/login`
* use this route login an existing user
* headers required
 * `Accept` : `application/json`
 * `Authorization` : `Basic <Base64(username:password)>`
* 200 response
 * a token

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
* use this route to delete a pic
* headers required
 * `Authorization` :  `Bearer <token>`
* 204 response
 * no content  
