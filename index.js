const express = require('express');
const database = require('./config/database');
const app = express();
const cloudinaryConnect = require('./config/cloudinary');

require('dotenv').config();
app.use(express.json());

// File upload middleware 
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const port = process.env.PORT || 3000;

// Routes
const Upload = require('./routes/fileUploadRoute');
app.use('/api/v1/upload', Upload);
 
// Listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to cloudinary
cloudinaryConnect();

// Connect to database
database.connectDB();