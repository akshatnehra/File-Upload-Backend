const mongoose = require('mongoose');
const File = require('../models/fileModel');
const mime = require('mime');

// get file extension from mime type
function getFileExtensionFromMimeType(mimeType) {
    return mime.getExtension(mimeType) || null;
}

// local file upload    
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        const fileName = Date.now() + '.' + getFileExtensionFromMimeType(file.mimetype);

        const path = __dirname + '/../uploads/' + fileName;

        file.mv(path, async (err) => {
            if(err) {
                console.log(err);
                console.log('Failed to upload file to local storage of server');

                res.status(500).json({
                    status: 'fail',
                    message: 'Failed to upload file to local storage of server'
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'File uploaded successfully to local storage of server'
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to upload file, please try again later'
        });
    }
}

// image upload
exports.imageUpload = async (req, res) => {
    
}

// video upload
exports.videoUpload = async (req, res) => {
        
}

// reduce image size and upload
exports.imageReduceUpload = async (req, res) => {
        
}