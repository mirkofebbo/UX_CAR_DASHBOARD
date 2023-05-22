import React from 'react';
import { Box, Typography } from '@mui/material';

var WIDTH = 1920;
var HEIGHT = 1080;

const Hud = () => {

    return (
        <div>
            <Box sx={{
                 position: 'absolute', 
                 left: `${WIDTH / 2}px`, 
                 top: `${HEIGHT / 2 }px`,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 transform: 'translate(-50%, -50%)', // place at the middle of the screen 
                }}>
                    <Typography variant='h4'> The Hud</Typography>
            </Box>
        </div>
    );
};

export default Hud;