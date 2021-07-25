const express = require('express');
const app = express();
const PORT = 5000;
const upload = require('express-fileupload')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv'); 
const nodemailer = require('nodemailer');


// // to use express-file upload 
app.use(upload());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


// // linking routes
app.use(require('./router/auth'));

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.get('/' ,(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.use(express.json());


app.listen(PORT,()=>{
    console.log(`The app is listening at http://localhost:${PORT}`);
});


