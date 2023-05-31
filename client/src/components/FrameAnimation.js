import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const AnimationPlayer = ({ size, animationName, totalFrames, interval }) => {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prevFrame => prevFrame < totalFrames ? prevFrame + 1 : 1);
    }, interval);
    return () => clearInterval(timer);
  }, [totalFrames, interval]);

  const imgSrc = `${process.env.PUBLIC_URL}/animations/${animationName}/frame_${frame}.png`;

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${size}px`,     // IMG SIZE
        height: `${size}px`,    // IMG SIZE
        backgroundColor: 'none',
        left: `${-size / 2}px`,   // CENTERING 
        top: `${-size / 2}px`,    // CENTERING 
      }}
    >
      <img src={imgSrc} alt="Animation frame" />
    </Box>
  );
};

export default AnimationPlayer;
