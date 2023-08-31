const mongoose = require('mongoose');
const File = require('../models/fileModel');
const mime = require('mime');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// get file extension from mime type
function getFileExtensionFromMimeType(mimeType) {
    return mime.getExtension(mimeType) || null;
}

// cloudinary file upload
async function cloudinaryFileUpload(file, folder, quality) {
    try {

        const options = { folder, resource_type: "auto" };

        if(quality) {
            options.quality = quality;
        }

        const result = await cloudinary.uploader.upload(file, options);

        console.log('File uploaded to cloudinary');
        return result;
    } catch (error) {
        console.log(error);
        console.log('Failed to upload file to cloudinary');
    }
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
    try {
        const { name, tags, email } = req.body;
        const file = req.files.file;

        const supportedImageTypes = ['png', 'jpg', 'jpeg'];
        const fileType = getFileExtensionFromMimeType(file.mimetype);

        if(!supportedImageTypes.includes(fileType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload a valid image file',
                supportedImageTypes: supportedImageTypes,
                receivedFileType: fileType
            });
        }

        // local file upload
        const filePath = __dirname + '/../uploads/' + Date.now() + '.' + fileType;
        file.mv(filePath, async (err) => {
            if(err) {
                console.log(err);
                console.log('Failed to upload file to local storage of server');
            } else {
                console.log('File uploaded to local storage of server');
                
                const response = await cloudinaryFileUpload(filePath, "sirnehra-uploads");

                console.log(response);

                // remove file from local storage of server
                fs.unlink(filePath, (err) => {
                    if(err) {
                        console.log(err);
                        console.log('Failed to delete file from local storage of server');
                    } else {
                        console.log('File deleted from local storage of server');
                    }
                });

                // save file details to database
                const newFile = new File({
                    name,
                    url: response.secure_url,
                    tags,
                    email
                });

                await newFile.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'File uploaded successfully to cloudinary',
                    data: {
                        file: newFile
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to upload image, please try again later'
        });
    }
}

// video upload
exports.videoUpload = async (req, res) => {
        const { name, tags, email } = req.body;
        const file = req.files.file;

        const supportedVideoTypes = ['mp4', 'mov', 'wmv', 'avi', 'flv', 'mkv'];
        const fileType = getFileExtensionFromMimeType(file.mimetype);

        if(!supportedVideoTypes.includes(fileType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload a valid video file',
                supportedVideoTypes: supportedVideoTypes,
                receivedFileType: fileType
            });
        }

        // local file upload
        const filePath = __dirname + '/../uploads/' + Date.now() + '.' + fileType;
        file.mv(filePath, async (err) => {
            if(err) {
                console.log(err);
                console.log('Failed to upload file to local storage of server');
            } else {
                console.log('File uploaded to local storage of server');
                
                const response = await cloudinaryFileUpload(filePath, "sirnehra-uploads");

                console.log(response);

                // remove file from local storage of server
                fs.unlink(filePath, (err) => {
                    if(err) {
                        console.log(err);
                        console.log('Failed to delete file from local storage of server');
                    } else {
                        console.log('File deleted from local storage of server');
                    }
                });

                // save file details to database
                const newFile = new File({
                    name,
                    url: response.secure_url,
                    tags,
                    email
                });

                await newFile.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'File uploaded successfully to cloudinary',
                    data: {
                        file: newFile
                    }
                });
            }
        });
}

// reduce image size and upload
exports.imageReduceUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.file;

        const supportedImageTypes = ['png', 'jpg', 'jpeg'];
        const fileType = getFileExtensionFromMimeType(file.mimetype);

        if(!supportedImageTypes.includes(fileType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload a valid image file',
                supportedImageTypes: supportedImageTypes,
                receivedFileType: fileType
            });
        }

        // local file upload
        const filePath = __dirname + '/../uploads/' + Date.now() + '.' + fileType;
        file.mv(filePath, async (err) => {
            if(err) {
                console.log(err);
                console.log('Failed to upload file to local storage of server');
            } else {
                console.log('File uploaded to local storage of server');
                
                const response = await cloudinaryFileUpload(filePath, "sirnehra-uploads", 30);

                console.log(response);

                // remove file from local storage of server
                fs.unlink(filePath, (err) => {
                    if(err) {
                        console.log(err);
                        console.log('Failed to delete file from local storage of server');
                    } else {
                        console.log('File deleted from local storage of server');
                    }
                });

                // save file details to database
                const newFile = new File({
                    name,
                    url: response.secure_url,
                    tags,
                    email
                });

                await newFile.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'File uploaded successfully to cloudinary',
                    data: {
                        file: newFile
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to upload image, please try again later'
        });
    }
}