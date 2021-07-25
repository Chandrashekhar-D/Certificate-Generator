import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  useDisclosure,
  Button,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

function App() {
  const [image, setImage] = useState(); 
  const [name, setName] = useState();
  const [preview, setPreview] = useState();
  const [color, setColor] = useState("black");
  const [csvData, setCsvData] = useState("");
  const [sendData, setSendData] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const download = () => {
    var node = document.getElementById("capture");
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
      setSendData(dataUrl);
      downloadURI(dataUrl,"name")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // To download the certificate template
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const post = async (e) => {
    e.preventDefault();
    download();
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ csvData: csvData, img: sendData }),
    });
    console.log(res);
  };

  var datatosend = [];
  var retrieveddata = [];
  var uploadedtheCSV = false;
  const readCSV = (event) => {
    console.log(event.target.files[0]);
    uploadedtheCSV = true;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text1 = e.target.result;
      retrieveddata = text1.split("\r\n");
      datatosend.push(text1);
      setCsvData(retrieveddata);
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <ChakraProvider>
     
            <div className="App">
            <div id="capture">
              {name ? <p id="name">{name}</p> : <p id="name"></p>}
              {preview ? <img src={preview} alt="" id="template" /> : <p id="template"> </p> }
            </div>
            <input
                type="file"
                name="template"
                id="image_input"
                accept="image/*"
                onChange={(e) => {
                  document.getElementById('image_input').style.display="none";
                  document.getElementById("template").style.position = "absolute";
                  document.querySelector("#template").style.top = "0px";
                  document.querySelector("#template").style.left = "0px";
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
            <br /> <br />
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mx={5}>
        Open Properties
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Properties</DrawerHeader>

          <DrawerBody>
            <form method="POST">
              <Input
                mb={3}
                type="text"
                name=""
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                mb={3}
                type="color"
                onChange={(e) => {
                  setColor(e.target.value);
                  changeColor();
                }}
              />
              <Button mb={3} onClick={move_up} colorScheme="blue">
                Move Up
              </Button>{" "}
              <br />
              <Button mb={3} onClick={move_down} colorScheme="blue">
                Move Down
              </Button>{" "}
              <br />
              <Button mb={3} onClick={move_left} colorScheme="blue">
                Move Left
              </Button>{" "}
              <br />
              <Button mb={3} onClick={move_right} colorScheme="blue">
                Move Right
              </Button>{" "}
              <br />
              <Button mb={3} onClick={fontplus} colorScheme="blue">
                Increase Font
              </Button>{" "}
              <br />
              <Button mb={3} onClick={fontmin} colorScheme="blue">
                Decrease Font
              </Button>{" "}
              <br />
              <Input mb={3} p={1} type="file" name="csv" onChange={readCSV} />
              <Input mb={3} type="text" placeholder="Enter your email" />
              <Input mb={3} type="text" placeholder="Enter your password" />
              <Button mb={3} type="button" colorScheme="red" onClick={post}>
                {" "}
                Generate Certificates{" "}
              </Button>
              <br />
              <Button onClick={download}>Download</Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
}

export default App;
