import React, { useEffect, useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider} from '@mui/material/styles';
import theme            from './theme';

import ReactDOM         from "react-dom/client";
import socket           from './socket';
// npm install nodemon --save-dev
// import Speedometer from './components/Speedometer';
import Speedometer      from './components/SpeedometerGrey';
import Tachometer       from './components/TachometerGrey';
import BarSpeedometer   from './components/barSpeedometer';
import FuelGauge        from './components/FuelGauge';
import TempGauge        from './components/TempGauge';
import Gear             from './components/Gear';
import Blinker          from './components/Blinkers'

import AudioPlayer      from './components/audio/AudioPlayer';
import tracks           from './components/audio/tracks';

/*
B     = right blinker 
Y     = left blinker 
Xbox  = Start engin 

*/

var WIDTH   = 895;
var HEIGHT  = 1600;
var global_speed = 0;
const App = () => {
  const [DATA, setData] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    socket.on('DATA', (data) => {
      // console.log('Received wheel data:', data);
      setData(data);
    });
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    WIDTH = screenDimensions.width;
    HEIGHT = screenDimensions.height;
    return () => {
      window.removeEventListener('resize', handleResize);
      socket.off('DATA');
    };
  }, []);

  return (
    <div>
      {DATA ? (
        <>
          <Box sx={{position: 'absolute', left: `${WIDTH/2}px`, top: `${350}px`}}>
            <Gear  size={100}  gear={DATA.GEAR} />
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2-155}px`, top: `${200}px`}}>
            <Tachometer size={300} pedal={DATA.PEDAL.GAS} gear={DATA.GEAR} speed={global_speed}/>
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2+155}px`, top: `${200}px`}}>
            <Speedometer size={300} pedal={DATA.PEDAL.GAS} gear={DATA.GEAR} speed={global_speed}/>
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2+370}px`, top: `${300}px`}}>
            <FuelGauge size={150}/>
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2-370}px`, top: `${300}px`}}>
            <TempGauge size={150}/>
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2+325}px`, top: `${100}px`}}>
            <Blinker size={50} button={DATA.BUTTONS.B} side="left" />
          </Box>
          <Box sx={{position: 'absolute', left: `${WIDTH/2-325}px`, top: `${100}px`}}>
            <Blinker size={50} button={DATA.BUTTONS.Y} side="right" />
          </Box>
          <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT/2 +250}px` }}>
            <AudioPlayer size={300} tracks={tracks}/>
          </Box>
        </>
      ) : (
        <p>Waiting for wheel data...</p>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
