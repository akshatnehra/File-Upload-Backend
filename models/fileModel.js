const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
});

// Send email using nodemailer on file upload
fileSchema.post('save', async function() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: this.email,
        subject: 'File uploaded successfully',
        text: `Your file ${this.name} has been uploaded successfully to cloudinary. You can view it at ${this.url}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});


module.exports = mongoose.model('File', fileSchema);