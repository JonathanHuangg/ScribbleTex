import React from 'react';
import logo from './logo.svg';
import github from './github.png';
import CanvasDraw from 'react-canvas-draw';
import Latex from 'react-latex';
import eraserImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/purple.png';
import newEraserImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/blue.png';
import pencilImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/purple.png';
import newPencilImage from '/Users/jonathan/Documents/Desktop/GT Master Files/Fall 2023/AI Hack/ScribbleTex/Server/src/Icons/blue.png';

const HostUi = ({ saveableCanvas, setIsMouseOut, setIsMouseDown, handleMouseUp}) => {
    //functions

    //function for togglingEraser
    const [eraserSrc, setEraserSrc] = React.useState(eraserImage);
    const [pencilSrc, setPencilSrc] = React.useState(pencilImage);

    const toggleEraser = () => {
      console.log("Eraser toggled");
      setEraserSrc(eraserSrc === eraserImage ? newEraserImage : eraserImage)
    }

    const togglePencil = () => {
      setPencilSrc(pencilSrc === pencilImage ? newPencilImage : pencilImage)
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
            ref={saveableCanvas}
            brushRadius={8}
            brushColor="black"
            lazyRadius={5}
            canvasWidth={window.innerWidth}
            canvasHeight={window.innerHeight}
            />
          </div>
        </div>




      </div>
    </div>
  );
  }
export default HostUi;
