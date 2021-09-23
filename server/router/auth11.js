// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const csv = require("fast-csv");
// const nodemailer = require("nodemailer");
// const Image = require("purified-image");
// const { dirname } = require("path");
// const { count } = require("console");


// router.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });


// // To move file into server folder
// router.post('/upload',async (req,res)=>{
//     try {
//         const file = req.files.template;
//         const savePath = path.join(__dirname,'../','uploads',file.name)
//         await file.mv(savePath)
//         console.log("Image Uploaded")
//         res.status(200).json({
//           success: "success",
//         });
//     } catch (error) {
//         console.log(error);
//         res.send("Error uploading file")
//     }
// })


// router.post("/api", async (req, res) => {
//   const data = req.body;
//   let [top,left,font,fontfile,fontsize,color,filename]=[data.texttop,data.textleft,data.textfont,data.textfontfile,data.textsize,data.color,data.fileName]
//   let senderEmail = data.Email;
//   let senderPassword = data.Password;
//   let csvobj = await data.csvData;
//   let csvNames = [];
//   let csvEmails = [];
//   // let name = [];
//   var arrayLength = csvobj.length;
//   var address = "";
//   for (var i = 0; i < arrayLength -1; i = i + 1) {
//     console.log(csvobj[i].split(",")[1]);
//     address = csvobj[i].split(",")[1] + "," + address;
//     str = address.replace(/,\s*$/, "");
//   }

//   for (var i = 0; i < arrayLength - 1; i = i + 1) {
//     console.log(csvobj[i].split(",")[0]);
//     console.log(csvobj[i].split(",")[1]);
//     recName=csvobj[i].split(",")[0]+" "+csvobj[i].split(",")[1]
//     csvNames.push(recName)
//   }
//   console.log(csvNames)


//   console.log("Sender Email : ",senderEmail);
//   console.log()
//   console.log("Sender Password : ",senderPassword);
//   console.log()
//   console.log("CSV Data : ",csvobj);
//   console.log()

//   csvEmails = address.split(",");
//   console.log("THIS IS MAIL ARRAY");
//   csvEmails.forEach(element => {
//     console.log(element);
//   });
//   console.log(csvEmails);

//   var userData=[]

//   for (let i=0; i<csvEmails.length-1 ; i++){
//     userData[csvEmails[i]]=csvNames[i];
//   }
//   console.log(userData)

 


// //   //To render image at backend
// // let image = new Image(`uploads/temp.png`);
// // image
// // .loadFont('fonts/OpenSans.ttf')
// // .draw(ctx => {
// //     ctx.fillStyle = '#000000';
// //     ctx.font = '50 Open Sans';
// //     ctx.fillText(`${csvNames}`, 100, 500);
// // })
// // .save(`out/certificate.jpg`)
// // .then(() => console.log('Image Saved'))
// // .catch((err)=>console.log(err));




// //ITEERATION______
// csvEmails.forEach(async element=>{
//   cnt=parseInt(csvEmails.indexOf(element));
//   console.log(typeof(cnt))
//   console.log(cnt)
//   console.log(csvNames[cnt])
//   console.log(typeof(csvNames[cnt]))
//   receiverName=csvNames[cnt];

//   const transporter = await nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//     user: 'dummyacc012345689@gmail.com', // generated ethereal user
//     pass: 'dummy@321', // generated ethereal password
//     // user: `${senderEmail}`, // generated ethereal user
//     // pass: `${senderPassword}`, // generated ethereal password
//     },


// });

//   //To render image at backend
//   let image = new Image(`uploads/${filename}`);
//   var fontsizefinal=fontsize*16;
//   image
//   .loadFont(`fonts/${fontfile}.ttf`)
//   .draw(ctx => {
//       ctx.fillStyle = color;
//       ctx.font = `${fontsizefinal} ${font}`;
//       ctx.fillText('example', left, top);
//   })
//   .save(`out/${receiverName}.jpg`)
//   .then(() => console.log('Image Saved'))
//   .catch((err)=>console.log(err));
// const msg = {
//     from: '" from dsc 👻" <dummy012345689@gmail.com>',
//     to: element,
//     subject: "Hello ✔", // Subject line
//     text:userData.element, // plain text body
//     // html: "<h1>Congratulations you have earned Certificate</h3>  ", // html body
//     attachments: [{
//         filename: 'certificate.png',
//         path: `out/certificate.jpg`
//     }]
// }

// // send mail with defined transport object
// let info = await transporter.sendMail(msg);

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     console.log("email sent")
    

// });

//   // const transporter = await nodemailer.createTransport({
//   //     service: "gmail",
//   //     port: 587,
//   //     secure: false, // true for 465, false for other ports
//   //     auth: {
//   //     user: 'dummyacc012345689@gmail.com', // generated ethereal user
//   //     pass: 'dummy@321', // generated ethereal password
//   //     // user: `${senderEmail}`, // generated ethereal user
//   //     // pass: `${senderPassword}`, // generated ethereal password
//   //     },
//   // });
//   // const msg = {
//   //     from: '" from dsc 👻" <dummy012345689@gmail.com>',
//   //     to: address,
//   //     subject: "Hello ✔", // Subject line
//   //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent turpis neque, placerat sed vestibulum sit amet, lacinia eget ante. Vivamus pulvinar eu eros quis rhoncus. Pellentesque interdum risus quis urna posuere auctor et sit amet eros. Suspendisse facilisis lacinia eros sed accumsan. Ut rhoncus orci sit amet tempus pulvinar. ", // plain text body
//   //     html: "<h1>Congratulations you have earned Certificate</h3>  ", // html body
//   //     attachments: [{
//   //         filename: 'certificate.png',
//   //         path: `out/certificate.jpg`
//   //     }]
//   // }

//   // // send mail with defined transport object
//   // // let info = await transporter.sendMail(msg);

//   // console.log("Message sent: %s", info.messageId);
//   // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // // Preview only available when sending through an Ethereal account
//   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   //     console.log("email sent")
// });



// module.exports = router;
