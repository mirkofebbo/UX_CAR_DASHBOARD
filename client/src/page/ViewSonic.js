import React from 'react';
import { Box } from '@mui/material';

import AudioPlayer from '../components/audio/AudioPlayer';
import tracks from '../components/audio/tracks';

// VIEWSONIC SCREEN (MEDIUM SIZE TOUCH SCREEN)
var WIDTH = 895; //DISPLAY WIDTH 
var HEIGHT = 1600; // DISPLAY HEIGHT 

const ViewSonic = () => {

    return (
        <div>
            <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${HEIGHT / 2 }px` }}>
                <AudioPlayer size={500} tracks={tracks} />
            </Box>
        </div>
    );
};

export default ViewSonic;