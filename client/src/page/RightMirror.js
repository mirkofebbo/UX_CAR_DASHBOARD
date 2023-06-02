import React from 'react';
import { Box, Typography } from '@mui/material';
import MessageReceiver from '../components/MessageReceiver';

var WIDTH = 800;
var HEIGHT = 480;

const RightMirror = () => {

    return (
        <Box sx={{
            position: 'absolute',
            left: `${WIDTH / 2}px`,
            top: `${HEIGHT / 2}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)', // place at the middle of the screen 
        }}>
            <Typography variant='h4'> RIGHT mirror </Typography>
            <Box sx={{ position: 'absolute'}}>
                <MessageReceiver size={500} />
            </Box>
        </Box>
    );
};

export default RightMirror;