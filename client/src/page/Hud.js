import React from 'react';
import { Box, Typography } from '@mui/material';
import FrameAnimation from '../components/FrameAnimation';

var WIDTH = 1920;
var HEIGHT = 1080;

const Hud = () => {

    return (
        <div>
            <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT / 2 - 100}px` }}>
                <Typography align="center" sx={{ width: `${100}px`, height: `${100}px`}} variant='h4'> The Hud</Typography>
            </Box>
            <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT / 2}px` }}>
                <FrameAnimation
                    size={500}
                    animationName={'animation_1'}
                    totalFrames={32} interval={100} />
            </Box>
        </div>
    );
};

export default Hud;