const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const nodemailer = require("nodemailer");
const Image = require("purified-image");
const { dirname } = require("path");


router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// To move file into server folder
router.post('/upload',async (req,res)=>{
    try {
        const file = req.files.template;
        const savePath = path.join(__dirname,'../','uploads',file.name)
        await file.mv(savePath)
        console.log("Image Uploaded")
        res.status(200).json({
          success: "success",
        });
    } catch (error) {
        console.log(error);
        res.send("Error uploading file")
    }
})


router.post("/api", async (req, res) => {
  const data = req.body;
  let senderEmail = data.Email;
  let senderPassword = data.Password;
  let csvobj = await data.csvData;
  let [top,left,font,fontfile,fontsize,color,filename]=[data.texttop,data.textleft,data.textfont,data.textfontfile,data.textsize,data.color,data.fileName]
  let csvNames = [];
  let csvEmails = [];
  // let name = [];
  // var arrayLength = csvobj.length;
  // var address = "";
  // for (var i = 0; i < arrayLength ; i++) {
  //   console.log(csvobj[i].split(",")[1]);
  //   address = csvobj[i].split(",")[1] + "," + address;
  //   str = address.replace(/,\s*$/, "");
  // }
  // var usermail;
  // var username;
  console.log("Sender Email : ",senderEmail);
  console.log("here it is",top,left,font,fontsize,fontfile,color,filename)
  console.log("CSV Data : ",csvobj);
 // console.log("address-->",address)
//   To render image at backend

var fontsizefinal=fontsize*16;
csvobj.forEach( element=>{
  csvEmails.push((element.split(','))[1]);
  csvNames.push((element.split(',')[0]))
})
// csvEmails.pop();
// csvNames.pop();
console.log(`csvNames ${csvEmails} ${csvNames}`)
csvEmails.forEach( async element => {
console.log("Font file->",`fonts/${fontfile}.ttf   ${fontsizefinal}`)
cnt=parseInt(csvEmails.indexOf(element));
console.log(csvNames[cnt]);
// receiverName=csvNames[cnt];
console.log(`Email is being sent to ${csvNames[cnt]} ${element}`);
let image = new Image(`uploads/${filename}`);
  image
.loadFont(`fonts/${fontfile}.ttf`)
.draw( ctx => {
    ctx.fillStyle = 'black';
    ctx.font = `${fontsizefinal} ${font}`;
    ctx.fillText(`${csvNames[cnt]}`, left, top);
}).save('out/certificate.jpg')
.then(() => console.log('Image Saved'))
.catch((err)=>console.log(err));

const transporter =  nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
  user: 'dummyacc012345689@gmail.com', // generated ethereal user
  pass: 'dummy@321', // generated ethereal password
  // user: `${senderEmail}`, // generated ethereal user
  // pass: `${senderPassword}`, // generated ethereal password
  },
});
const msg = {
  from: '" from dsc 👻" <dummy012345689@gmail.com>',
  to: element,
  subject: "Hello ✔", // Subject line
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent turpis neque, placerat sed vestibulum sit amet, lacinia eget ante. Vivamus pulvinar eu eros quis rhoncus. Pellentesque interdum risus quis urna posuere auctor et sit amet eros. Suspendisse facilisis lacinia eros sed accumsan. Ut rhoncus orci sit amet tempus pulvinar. ", // plain text body
  html: `<h1>Congratulations ${csvNames[cnt]} you have earned Certificate</h3>  `, // html body
  attachments: [{
      filename: 'certificate.jpg',
      path: `out/certificate.jpg`
  }]
}

// send mail with defined transport object
let info = await  transporter.sendMail(msg);

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  console.log("email sent")
});


 
});



module.exports = router;

