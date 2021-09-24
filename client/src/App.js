import "./App.css";
import React, { useEffect, useState, useRef } from "react";

import domtoimage from "dom-to-image";

function App() {
  var toggled=true
  const [image, setImage] = useState(); 
  const [name, setName] = useState();
  const [preview, setPreview] = useState();
  const [color, setColor] = useState("black");
  const [csvData, setCsvData] = useState("");
  const [sendData, setSendData] = useState([]);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

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
  

  function uploaded() {
    var nameinput=document.getElementById("name")
    document.getElementById("name").style.position = "absolute";
    document.querySelector("#name").style.top = "100px";
    document.querySelector("#name").style.left = "300px";
    document.getElementById("name").style.fontSize = "2rem";
    document.getElementById("name").style.fontweight = "bold";
    document.getElementById("name").style.color = "black";
  }

  const move_down = () => {
    document.getElementById("name").style.top =
      parseInt(document.getElementById("name").style.top) + 10 + "px";
  };
  const move_up = () => {
    document.getElementById("name").style.top =
      parseInt(document.getElementById("name").style.top) - 10 + "px";
  };

  const move_left = () => {
    document.getElementById("name").style.left =
      parseInt(document.getElementById("name").style.left) - 10 + "px";
  };
  const move_right = () => {
    document.getElementById("name").style.left =
      parseInt(document.getElementById("name").style.left) + 10 + "px";
  };
  const fontplus = () => {
    document.getElementById("name").style.fontSize =
      parseFloat(document.getElementById("name").style.fontSize) + 0.1 + "rem";
  };
  const fontmin = () => {
    document.getElementById("name").style.fontSize =
      parseFloat(document.getElementById("name").style.fontSize) - 0.1 + "rem";
  };
  const changeColor = () => {
    document.getElementById("name").style.color = color;
  };

  // const download = () => {
  //   document.querySelector("#name").style.top=parseInt(document.querySelector("#name").style.top)-71+"px"
  //   document.querySelector("#name").style.left=parseInt(document.querySelector("#name").style.left)-5.3+"px"
  //   var node = document.getElementById("capture");
  //   domtoimage
  //     .toPng(node)
  //     .then(function (dataUrl) {
  //     setSendData(dataUrl);
  //     downloadURI(dataUrl,"name")
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // To download the certificate template
  // function downloadURI(uri, name) {
    
  //   var link = document.createElement("a");
  //   link.download = name;
  //   link.href = uri;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }
  
const generateall =()=>{
  var node ;
     var cnt=0;
    
        var intervl=setInterval(function (){
          console.log(cnt);
          document.getElementById('name').innerText=(csvData[cnt].split(','))[0];
          console.log((csvData[cnt].split(','))[0]+cnt);
            node=document.getElementById("capture");
            getdataurl(node,cnt)
          console.log("this is cnt",cnt);
        cnt++;
          if(cnt==csvData.length-1){
            clearInterval(intervl);
          }
        },5000)
    function getdataurl(node,counttt){
      domtoimage
      .toPng(node)
        .then(function (dataUrl) {
        // setSendData(dataUrl);
        setSendData(prevarr=>[prevarr,[csvData[counttt].split(',')[0],csvData[counttt].split(',')[1],dataUrl] ]  );
        console.log(dataUrl);
        })
        .catch((err) => {
          console.log(err);
        });
  
      }
       //**********rewa*********
    // post();
    showsendData();
}
function showsendData(){
  console.log("****send data*****"+sendData);
}
  const post = async (e) => {
    e.preventDefault();
    // download();
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ csvData: csvData, img: sendData }),
      //**********rewa*********
      body:JSON.stringify({
        data:sendData
      //**********rewa*********
      }),
    });
    console.log(res);
  };

  var datatosend = [];
  var retrieveddata = [];
  var uploadedtheCSV = false;
  const readCSV = (event) => {
    console.log("here "+event.target.files[0]);
    uploadedtheCSV = true;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text1 = e.target.result;
      // console.log(text1)
      retrieveddata = text1.split("\r\n");
      // console.log(retrieveddata)
      datatosend.push(text1);
      setCsvData(retrieveddata);
    };
    reader.readAsText(event.target.files[0]);
  };
 
  

  return (
    
    <div>
    <div id="navbar">Developer Students Club Vishwakarma Institute of Technology Pune</div>
    <div id="main">
      
            <div id="App" >
            <div id="capture"  >
              {name ? <p id="name">{name}</p> : <p id="name"></p>}
              {preview ? <img src={preview} alt="" id="template" /> : <p id="template"> </p> }
            
            
              </div>
              <div id="guidelines">
              <input
                type="file"
                name="template"
                id="image_input"
                accept="image/*"
                onChange={(e) => {
                  document.getElementById('guidelines').style.display="none";
                  document.getElementById("template").style.position = "absolute";
                 
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    uploaded();
                  } else {
                    setImage(null);
                  }
                }}
              />
              <ul  type="square" id="guide">
                <li>Upload the Template Image from 'Choose File' above</li><br/>
                <li className="red"><strong>Upload the CSV, containing name and emails only of recipients,  from 'Choose File' from Side Panel</strong></li><br/>
                <li className="red">If the Side Panel of properties isn't visible, click on Toggle Arrow to make it so</li><br/>
                <li>You can insert a text and adjust it's rendering over the template by using shortcuts too</li><br/>
                <li className="red"><strong>Note that the names from CSV will appear in place of final test text that you adjust.</strong></li><br/>
                <li>After finalizing positions, click on 'Generate Certificates', to generate and mail certificates.</li><br/>
                <li>You can optionally even download the tested Certificate, to adjudge.</li><br/>
              </ul>
              </div>
            </div>
            <br /> <br />
    
            
              <div id="controls">
              
              <form method="POST">
                <br/>
              <input
                id="entertesttext"
                type="text"
                name=""
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
                           
              
              <br/><br/>
              <label id="csvlabel">Upload CSV</label><br/><br/>
              <input id="upcsv"  type="file" name="csv" onChange={readCSV} /><br/><br/>
              <input id="email" type="text" placeholder="Enter your email" /><br/><br/>
              <input id="passw" type="password" placeholder="Enter your password" /><br/><br/>
              {/* *******rewa***** */}
              <button type="button"  onClick={generateall}>
                
                Generate Certificates
              </button>
              {/* *******rewa***** */}
              </form>
              <br/>
              {/* <button onClick={download}>Download</button> */}
              </div>
              <div id="side-panel">
               <div>
                 <br/>
                 <img id="toggle"  height="35px" width="35px"
                 
                 src={'gdgtogglein.png'}
                 onClick={()=>{
                 if(toggled==true){
                  var sidepanel=document.getElementById('side-panel')
                  sidepanel.style.transform="translate3d(0.5px,0,0)";
                  document.getElementById('toggle').src="gdgtoggleout.png"
                  toggled=false
                 }
                 else{
                  var sidepanel=document.getElementById('side-panel')
                  sidepanel.style.transform="translate3d(205.5px,0,0)";
                  document.getElementById('toggle').src="gdgtogglein.png"
                  toggled=true
                 }
                  
                }}
                />
                 <br/>
                 <br/>
                <img src={'font.png'} height="25px" width="25px" onClick={()=>{
                  var sidepanel=document.getElementById('side-panel')
                  sidepanel.style.transform="translate3d(0.5px,0,0)";
                  document.getElementById('toggle').src="gdgtoggleout.png"
                }} />
                <select id="fontselect" onChange={(x)=>{
                   console.log(x.target.value)
                   document.getElementById("name").style.fontFamily = x.target.value;
                   
                }}>
                 
                  
                  
                  
                  <option value="verdana">Verdana</option>
                  <option value="Arial">Arial</option>
                  <option value="cursive">Cursive</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="georgia">Georgia</option>
                  <option  value="'Playfair Display', serif">Playfair Display</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Cambria">Cambria</option>
                  
                  
                  </select><br/><br/>
                <img src={'color.png'}  onClick={()=>{
                  var sidepanel=document.getElementById('side-panel')
                  sidepanel.style.transform="translate3d(0.5px,0,0)";
                  document.getElementById('toggle').src="gdgtoggleout.png"
                }} height="25px" width="25px" />
              <input
               id="colors"
                type="color"
                onChange={(e) => {
                  setColor(e.target.value);
                  changeColor();
                }}
              /><br/><br/>
              <img src={'up.png'} onClick={move_up} height="25px" width="25px" />
              <button id="up" onClick={move_up} >
                Move Up
              </button>
              <br /><br/>
              <img src={'down.png'} onClick={move_down} height="25px" width="25px" />
              <button id="down" onClick={move_down} >
                Move Down
              </button>
              <br /><br/>
             <img src={'left.png'}  onClick={move_left} height="25px" width="25px" />
              <button id="left" onClick={move_left} >
                Move Left
              </button>
              <br /><br/>
              <img src={'right.png'} onClick={move_right} height="25px" width="25px" />
              <button id="right" onClick={move_right} >
                Move Right
              </button>
              <br /><br/>
              <img src={'plus.png'} onClick={fontplus} height="25px" width="25px" />
              <button id="f+" onClick={fontplus} >
                Increase Font
              </button>
              <br /><br/>
              <img src={'minus.png'} onClick={fontmin} height="25px" width="25px" />
              <button id="f-" onClick={fontmin} >
                Decrease Font
              </button>
              <img/>
              
              </div>
              </div>
         
     </div>
     </div>
  );
}

export default App;
