const express = require('express');
const app = express();
const PORT = 5000;
const fileUpload = require('express-fileupload')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv'); 
const nodemailer = require('nodemailer');


// // to use express-file upload 
app.use(fileUpload());


app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


// // linking routes
app.use(require('./router/auth'));



app.listen(PORT,()=>{
    console.log(`The app is listening at http://localhost:${PORT}`);
});
