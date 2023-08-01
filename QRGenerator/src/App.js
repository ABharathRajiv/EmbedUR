import { useEffect, useState } from 'react';
import './App.css';

function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("none");
  const [size, setSize] = useState(250);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
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

  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
  }, [word, size, bgColor]);
  

  // Updating the input word when user
  // click on the generate button
  function handleClick() {
    console.log('word', word);
    console.log('qrCode', qrCode);
    setWord(temp);
  }

  return (
    <div className="App" style={gradientStyle}>
      <h1>QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            onChange={(e) => {
              setTemp(e.target.value);
            }}
            placeholder="Enter link or text (https://embedur.com)"
          />
          <button className="button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className="extra">
          <h5>Background Color:</h5>
          <input
            type="color"
            onChange={(e) => {
              setBgColor(e.target.value.substring(1));
            }}
          />
          <h5>Dimension:</h5>
          <input
            type="range"
            min="200"
            max="500"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="output-box">
        <img src={qrCode} alt="" />
        {/* <a href={qrCode} download="QRCode">
          <button type="button">Download</button>
        </a> */}
      </div>
	  <a href={qrCode} download="QRCode">
          <button type="button">Download</button>
        </a>
		<div className="floating-text">
        By Bharath Rajiv A
      </div>
    </div>
  );
}

export default App;
