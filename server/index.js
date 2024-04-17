const express = require('express');
const connectToMongo = require('./db');
const { readdirSync } = require('fs');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 45 * 60 * 1000    // session expires in 45 mins
    }
})
);

// connecting to the MongoDB Database
connectToMongo();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Accessing all available routes of the application
readdirSync('./routes')?.map((route) => app.use('/api', require('./routes/' + route)));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port 5000.');
});