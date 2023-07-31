import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import OTPValidation from './OTPValidation';


function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
//To generate random color for each box

function App() {
    const [gradientStyle, setGradientStyle] = useState({});

    // Generate random colors when the component mounts
    useEffect(() => {
      const startColor = getRandomColor();
      const endColor = getRandomColor();
      const newGradientStyle = {
        background: `linear-gradient(260deg, ${startColor} 0%, ${endColor} 82%)`,
      };
      setGradientStyle(newGradientStyle); // Update the gradient background color
    }, []);

  return (
    <div className="App" style={gradientStyle}>
      <OTPValidation />
      <div className="floating-text">
        By Bharath Rajiv A
      </div>
    </div>
  );
}

export default App;

