import "./App.css";
import React, { useEffect, useState } from "react";
import { ChakraProvider, Stack, Box, Button, Center, Input } from "@chakra-ui/react";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
import destr from 'destr';

function App() {
  function uploaded() {
    document.getElementById('name').style.position = 'absolute'
    document.querySelector("#name").style.top = "100px";
    document.querySelector("#name").style.left = "300px";
    document.getElementById("name").style.fontSize = "2rem";
    document.getElementById("name").style.fontweight = "bold";
    document.getElementById("name").style.color = "black";
  }


  const move_down = ()=> {
    document.getElementById("name").style.top = parseInt(document.getElementById("name").style.top) + 10 +"px";
  }
  const move_up =()=> {
    document.getElementById("name").style.top = parseInt(document.getElementById("name").style.top) - 10 +"px";
    }
  
  const move_left =()=> {
    document.getElementById("name").style.left = parseInt(document.getElementById("name").style.left) - 10 +"px";
  }
  const move_right =()=> {
    document.getElementById("name").style.left = parseInt(document.getElementById("name").style.left) + 10 +"px";
  }
  const fontplus =()=> {
    document.getElementById('name').style.fontSize=parseFloat(document.getElementById('name').style.fontSize)+0.1+"rem";
  }
  const fontmin =() =>{
    document.getElementById('name').style.fontSize=parseFloat(document.getElementById('name').style.fontSize)-0.1+"rem";

  }
  const changeColor = ()=>{
    
    document.getElementById("name").style.color = "white";
  }

  const convert = ()=>{
    html2canvas(document.querySelector("#capture")).then(canvas => {
      var image = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
      window.location.href = image;
  });
  }

  const download =()=>{
    var node = document.getElementById("capture");
    domtoimage.toPng(node).then(function(dataUrl){
      // var img = new Image();
      // img.src = dataUrl;
      // downloadURI(dataUrl, "image.png")
  // console.log("This is dataurl",dataUrl)

      setSendData(dataUrl)
      // console.log("This is",typeof(sendData))
    }).catch((err)=>{
      console.log(err);
    })
  }


  function downloadURI(uri,name){
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link);
  }

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const [csvData,setCsvData] = useState("");
  const [sendData,setSendData] = useState("");

const  post = async (e)=>{
  e.preventDefault();
  download()
  console.log(sendData + "Lol")
  console.log(typeof sendData)
  //  console.log("image",sendData)
  // console.log("csv",csvData)
  // download();
  // console.log(typeof(destr(sendData)))
  const res = await fetch("/api",{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body: JSON.stringify({"csvData":csvData,"img":sendData})
  });
  console.log(res);
}


// var node = document.getElementById("capture");
//   domtoimage.toPng(node).then(function(dataUrl){
//     // var img = new Image();
//     // img.src = dataUrl;
//     // downloadURI(dataUrl, "image.png")
//     setSendData(dataUrl)
//   }).catch((err)=>{
//          console.log(err);
//    })


// let data = sendData;
//   console.warn(data)
//   fetch("http://localhost:5000/",{
//     method:'POST',
//     headers:{
//       'Accept':'application/json',
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(data)
//   }).then((result)=>{
//     console.warn(result)
//   })



var datatosend=[];
var retrieveddata=[];
var uploadedtheCSV=false;

const readCSV =(event)=>{
    
  console.log(event.target.files[0]);
  uploadedtheCSV=true;
  const reader =new FileReader()
  reader.onload=function (e){
    const text1=e.target.result;
    retrieveddata= text1.split('\r\n')
    datatosend.push(text1);
    setCsvData(retrieveddata)
  }
  reader.readAsText(event.target.files[0])
}


  return (
    <ChakraProvider>
      <Stack direction={["column", "row"]} spacing="24px">
        <Center>
          <Box w="220px" h="600px" >
            <form method="POST">
          <Input
          mt={10} mx={4}
                type="text"
                name=""
                placeholder="Enter your name"
                
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            <Button mx={4} my={2} onClick={changeColor}> Change Color</Button>
            <Button mx={4} my={2} mt={2} onClick={move_up} colorScheme="blue">
              Move Up
            </Button>{" "}
            <br />
            <Button mx={4}  my={2} onClick={move_down} colorScheme="blue">
              Move Down
            </Button>{" "}
            <br />
            <Button mx={4} my={2}  onClick={move_left} colorScheme="blue">
              Move Left
            </Button>{" "}
            <br />
            <Button mx={4} my={2}  onClick={move_right} colorScheme="blue">
              Move Right
            </Button>{" "}
            <br />
            <Button mx={4} my={2}  onClick={fontplus} colorScheme="blue">
              Increase Font
            </Button>{" "}
            <br />
            <Button mx={4} my={2}  onClick={fontmin} colorScheme="blue">
              Decrease Font
            </Button>{" "}
            <br />
            <Input
            mx={4} my={2}
                type="file"
                name="csv"
                onChange={readCSV} />
            {/* <Button colorScheme="red" mx={2} onClick={download}> Generate Certificates</Button> */}
            <Button type="button" onClick={post}> Send Data </Button>

            </form>
          </Box>
        </Center>
        <Center>
          <Box w="980px" h="">
            <div className="App">
              <input
                type="file"
                name="template"
                id=""
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    uploaded();
                  } else {
                    setImage(null);
                  }
                }}
              />
            </div>
            <br />
            <div id="capture">
                {name ? <p id="name">{name}</p> : <p id="name"></p>}
                {preview ? <img src={preview} alt="" id="template" /> : null}
              </div>
          </Box>
          
        </Center>
      </Stack>

              {/* <form id="form" method="POST" >
                <input type="text" value={sendData} name="name" id="data" onChange={(e)=>{
                  document.getElementById("data").style.color="black"
                  setSendData(e.target.value)
                }} />
                <button type="button" onClick={post}> Send Data </button>
              </form> */}

    </ChakraProvider>

  );
}

export default App;
