import React from 'react';
import background from '../images/speedometer2/background.png';
import needle from '../images/speedometer2/needle.png';
// STYLING
import { Box } from '@mui/material';

// mapping function to adjust the number being display + the angle of rotation
function mapValue(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Function to create a speedometer with PNG files 
const Speedometer_grey = ({ size, position, speed }) => {
  // The value used for the animation
  const mySpeed = mapValue(speed, 0, 1023, 120, -120);
  const myText = Math.ceil(mapValue(speed, 0, 1023, 220, 0));

  // 
  return (
    <Box sx={{position: 'absolute', top: position.x, left: position.y, bgcolor: 'black',}}>
      <Box component="img" src={background}     sx={{ position: 'absolute', width: size, height: size }} />
      <Box component="img" src={needle}
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          transform: `rotate(${mySpeed}deg)`,
          borderStyle: "none",
          outline: "none",
          boxShadow: "none",    
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          color: 'white',
          width: size,
          lineHeight: `${300}px`,
          height: size,
          textAlign: 'center',
        }}
      >
        {myText}
      </Box>
    </Box>
  );
};

export default Speedometer_grey;
