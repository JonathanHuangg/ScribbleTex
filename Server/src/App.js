import React, { useState, useRef} from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import 'katex/dist/katex.min.css';
import HostUi from './HostUi.js';

function App() {


  // This is a React hook. It is a way to store state in a functional component.
  const [drawingDataUrl, setDrawingDataUrl] = useState('');

  // This assigns a reference to the canvas so we can access it later.
  const saveableCanvas = useRef();

  // Need a string defined that will be updated in the future.
  const [text, setText] = useState('');

  // This will be a combined set of latex script that can be saved!
  const [output, setOutput] = useState('');

  const translate_latex = (intputtext) => {
    const category_index = {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "=": "=",
      "(": "(",
      ")": ")",
      "forall": "\\forall",
      "int": "\\int",
      "log": "\\log",
      "X": "x",
      "y": "y",
      "z": "z",
      "+": "+",
      "-": "-",
      "pi": "\\pi"
    }

    return category_index[intputtext];
  }

  //These are functions to handle the mouse events
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseOut, setIsMouseOut] = useState(false);


  //This downloads the image to the user's computer.a
  //Probably a placeholder since it will be uploaded to the server.
  const downloadImage = async (imgPath) => {

    const byteCharacters = atob(imgPath.split(',')[1]); // Change into byte characters
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('image', blob);

    // Make an HTTP request to your backend here
    // You can use the fetch API or any HTTP library of your choice

    // For demonstration purposes, let's log the formData
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.result);
        const cur_latex = translate_latex(result.result);

        if (text === '') {
          setText("$" + cur_latex + "$");
        } else {
          setText(text.substring(0, text.length - 1) + cur_latex + "$");
        }
        
        setOutput(result.result);
 
        // Handle the response from the server, e.g., display a success message
      } else {
        console.error('Failed to upload file:', response.status, response.statusText);
        // Handle errors, e.g., display an error message
        saveableCanvas.current.clear();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle other errors, e.g., display an error message
      saveableCanvas.current.clear();
    }

  }

  
  // This method will be overhauled in order to still track changes, right now, does nothing
  const handleMouseUp = () => {
    // Note that this calls the capture function above.
    // capture();
    // alert("Drawing finished!"); 
  };
  

  const predictModel = async () => {

    const formData = new FormData();
    formData.append('image', drawingDataUrl);

    // Make an HTTP request to your backend here
    // You can use the fetch API or any HTTP library of your choice

    // For demonstration purposes, let's log the formData
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle the response from the server, e.g., display a success message
      } else {
        console.error('Failed to upload file:', response.status, response.statusText);
        // Handle errors, e.g., display an error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle other errors, e.g., display an error message
    }
  }

  // This function uploads the image to the server.
  // The server needs to be changed and tested.
  const handleUpload = async () => {

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    // Make an HTTP request to your backend here
    // You can use the fetch API or any HTTP library of your choice

    // For demonstration purposes, let's log the formData
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle the response from the server, e.g., display a success message
      } else {
        console.error('Failed to upload file:', response.status, response.statusText);
        // Handle errors, e.g., display an error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle other errors, e.g., display an error message
    }

  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  
  // Render html from hostUi.js
  return (
    <HostUi
      saveableCanvas={saveableCanvas}
      setIsMouseOut={setIsMouseDown}
      setIsMouseDown={setIsMouseDown}
      handleMouseUp={handleMouseUp}
    />
  );
}

export default App;
