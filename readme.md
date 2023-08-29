### API Routes

* **/api/v1/imageupload**

  * Upload image to cloudinary
  * Create an entry in database
* **/api/v1/videoupload**

  * Upload video to cloudinary
  * Create an entry in database
* **/api/v1/imagereduceupload**

  * If image size > 2 MB
    * Compress it
  * Upload it to cloudinary
  * Create an entry in database

> Files will be first temporarily uploaded on the server, then it will be uploaded to cloudinary. On success, files will be deleted from the server.

* **/api/v1/localfileupload**
  * upload file locally on server
  * Create an entry in database
