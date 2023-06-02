import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimationPlayer from '../components/FrameAnimation';

// var WIDTH = 1920;
// var HEIGHT = 1080;
var WIDTH = 500;
var HEIGHT = 500;
const Hud = () => {

    return (
        <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT / 2}px` }}>
            <AnimationPlayer
                text='LOADING'
                size={500}
                animationNumber={'1'}
                totalFrames={32}
                interval={100} />
        </Box>
    );
};

export default Hud;