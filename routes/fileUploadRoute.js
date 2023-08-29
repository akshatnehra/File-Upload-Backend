const express = require('express');
const router = express.Router();

// Controller
const { imageUpload, videoUpload, imageReduceUpload, localFileUpload } = require('../controllers/fileUploadController');

// Upload image
router.post('/imageupload', imageUpload);

// Upload video
router.post('/videoupload', videoUpload);

// Reduce size and Upload image 
router.post('/imagereduceupload', imageReduceUpload);

// Upload file locally on server
router.post('/localfileupload', localFileUpload);

module.exports = router;