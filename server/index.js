const express = require('express');
const app = express();
const PORT = 5000;
const upload = require('express-fileupload')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

// reading csv and storing in results 
// const results = [];
// fs.createReadStream(path.resolve(__dirname,'uploads/test.csv'))
//     .pipe(csv.parse({}))
//     .on('error', error => console.error(error))
//     .on('data', row => results.push(row))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows successfully`,results));


// // to use express-file upload 
app.use(upload());
app.use(express.json());
// // linking routes
app.use(require('./router/auth'));

// app.listen(PORT,()=>{
//     console.log(`The app is listening at http://localhost:${PORT}`);
// });
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.get('/' ,(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.use(upload())
app.use(express.json());



// csvtojson()
// .fromFile(csvfilepath)
// .then((json)=>{
//     console.log(json)

//     fs.writeFileSync("output.json",JSON.stringify(json), 'utf-8', (err)=>{
//         if (err) console.log(err)
//     })
// })

// var content =fs.readFileSync('output.json','utf-8')
// console.log(content)
// var data=[]
// data=JSON.parse(content)

// var emails= data.map(function(item){
//     return item.email
// })



// console.log(emails)
// let adress=""
// for (var i = 0; i < emails.length; i++) {
//      console.log(emails[i]);

//      adress=String(emails[i])+","+adress;

//     }
// console.log(adress)

app.listen(PORT, () => {
    console.log("LISTENING ON PORT 5000")
})


// app.post('/', async (req,res)=>{


//     if(req.files){
//         console.log(req.files)
//         console.log(typeof req.files)
//         console.log(String(req.files.file1.name))
//         // console.log(String(req.files.file2.name))
//         filen1=String(req.files.file1.name)
        
        
//     }

//     // req.files.file.mv("./uploads"+filen2,function(err){
//     //     if(err){
//     //         console.log("error")
//     //     } else{
//     //         console.log("file uploaded")
//     //     }
//     // })
//     const email = req.body;
//      console.log(email.email)
//         // create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//         user: 'dummyacc012345689@gmail.com', // generated ethereal user
//         pass: 'dummy@321', // generated ethereal password
//         },
//     });
//     const msg = {
//         from: '" from dsc 👻" <dummy0123456789@gmail.com>',
//         to: adress, 
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>, ", // html body
//         html:"Embedded image: <img src='cid:unique@nodemailer.com'/>",
//         attachments: [{
//             filename: 'image.jpg',
//             path: __dirname + '/' + filen1,
//             cid:'unique@nodemailer.com'
//         }]
//     }

//     // send mail with defined transport object
//     let info = await transporter.sendMail(msg);

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//         res.send("email sent")
// })

