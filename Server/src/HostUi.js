import React from 'react';
import logo from './logo.svg';
import github from './github.png';
import CanvasDraw from 'react-canvas-draw';
import Latex from 'react-latex';
import eraserImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/purple.png';
import newEraserImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/blue.png';
import pencilImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/purple.png';
import newPencilImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/blue.png';
// mutable reference object that persists for the lifetime of component (eg: canvas)
// perform side effects in function components (eg: data fetching, manually changing DOM)
import { useState, useRef, useEffect } from 'react';

const HostUi = ({ saveableCanvas, setIsMouseOut, setIsMouseDown, handleMouseUp}) => {
    // white canvas

    useEffect(() => { // Gets called after every render of component
      if (canvasRef.current) {
        const canvas = canvasRef.current.canvas.drawing; // get canvas element
        const context = canvas.getContext('2d'); //context is used to draw shapes, text, images, etc
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      } 
    }, []);

    //function for togglingEraser
    const [eraserSrc, setEraserSrc] = React.useState(newEraserImage);
    const [pencilSrc, setPencilSrc] = React.useState(pencilImage);
    const [draw, setDraw] = React.useState(true)

    const toggleEraser = () => {
      if (eraserSrc === eraserImage) {
        setEraserSrc(newEraserImage);
        setPencilSrc(pencilImage);
        setDraw(true)
      } else {
        setEraserSrc(eraserImage);
        setDraw(false)
      }
    }

    const togglePencil = () => {
      if (pencilSrc === pencilImage) {
        setPencilSrc(newPencilImage);
        setEraserSrc(eraserImage);
        setDraw(false);
      } else {
        setPencilSrc(pencilImage);
        setDraw(true);
      }
    }

    // Set references


    const canvasRef = useRef();

    const setRef = (element) =>{
      saveableCanvas.current = element;
      canvasRef.current = element;
    }
      
    
  
    // This is the HTML that is rendered to the page.
    
    return (
    <div className="App">  {/* This is the div for the entire App */}
      <header className="App-header" style={{ alignItems: 'flex-start'}}>
        {/* Scribble Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px',
          marginLeft: '10px'
        }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p className='title'>ScribbleTex</p>

        <div style={{ marginLeft: 'auto' }}></div>
        
        {/* GitHub link */}
        <a
          className="App-link"
          href="https://github.com/JonathanHuangg/ScribbleTex"
            target="_blank"
            rel="noopener noreferrer"
            style={{ height: '50px', marginTop: '5px' }}> 
          <img src={github} alt="GitHub" style={{ width: '50px', height: '50px' }} />
        </a>
        </div>
      
      {/* Create a navigation bar */}
      <div class="navigationBar" display="flex">

        <button class="tempImageEraser" onClick={toggleEraser}>
            <img src={eraserSrc} alt="Eraser"/>
        </button>

        <button class="tempImagePencil" onClick={togglePencil}>
            <img src={pencilSrc} alt="Pencil"/>
        </button>
      </div>


      </header>

        <div className='spacer' >

        <div className = 'hbox' style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Canvas */}
          <div className="canvas-container"
            onMouseUp={() => {
              setIsMouseDown(false);
              handleMouseUp(); // Trigger download on mouse up
            }}
            onMouseLeave={() => setIsMouseOut(true)}
            onMouseEnter={() => setIsMouseDown(true)}>
              <CanvasDraw
                ref={setRef}
                brushRadius={8}
                brushColor="black"
                lazyRadius={5}
                canvasWidth={window.innerWidth}
                canvasHeight={window.innerHeight}
                disabled={draw}
                gridColor="white"
                //canvasColor="white" // For some reason, this doesn't work so I have to do it manually
              />
          </div>
        </div>




      </div>
    </div>
  );
  }
export default HostUi;
