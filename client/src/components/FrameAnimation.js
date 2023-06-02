import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { SocketContext } from '../components/SocketContext';

const AnimationPlayer = ({ size, animationNumber, totalFrames, interval, text }) => {
  const [frame, setFrame] = useState(0);
  const socket = useContext(SocketContext);
  const [runAnimation, setAnimation] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    socket.current.on('startAnimation', (animation) => {
      if (animation === animationNumber) {
        setAnimation(true);
      }
    });

    socket.current.on('stopAnimation', (animation) => {
      if (animation === animationNumber) {
        setAnimation(false);
        setFrame(0);
      }
    });

    return () => {
      socket.current.off('startAnimation');
      socket.current.off('stopAnimation');
    };
  }, [animationNumber, totalFrames, interval, socket]);

  useEffect(() => {
    if (runAnimation) {
      intervalRef.current = setInterval(() => {
        setFrame(prevFrame => prevFrame < totalFrames ? prevFrame + 1 : 1);
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [runAnimation, totalFrames, interval]);

  const imgSrc = `${process.env.PUBLIC_URL}/animations/animation_${animationNumber}/frame_${frame}.png`;

  return (
    <div>
      {runAnimation ? (
        <>
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
            <Box
              sx={{
                position: 'absolute',
                color: 'white',
                width: '100%',
                lineHeight: `${size}px`,
                height: '100%',
                textAlign: 'center',
                top: `${size * 0.35}px`, // CHANGE THE POSITION OF THE TEXT ON THE Y AXIS 
              }}
            >
              <Typography variant='h4'>
                {text}
              </Typography>
            </Box>
            <Box component="img" src={imgSrc} alt="Animation frame"
              sx={{ position: 'absolute', width: '100%', height: '100%' }}
            />
          </Box>
        </>
      ) : (<div></div>)}
    </div>
  );
};

export default AnimationPlayer;
