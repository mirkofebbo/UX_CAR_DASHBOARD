import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReactDOM from "react-dom/client";
import socket from '../socket';

import Speedometer from '../components/Speedometer';
import Tachometer from '../components/Tachometer';
import FuelGauge from '../components/FuelGauge';
import TempGauge from '../components/TempGauge';
import Gear from '../components/Gear';
import Blinker from '../components/Blinkers'

// LONG SCREEN (LARGE SIZE TOUCH SCREEN)
var WIDTH = 1920; // DISPLAY WIDTH 
var HEIGHT = 326; // DISPLAY HEIGHT 
var global_speed = 0;

// This code display all the dashboard componants like speedometer and blinker. 
// All the componants are wrap in a Box to place them on the screen

const Dashboard = () => {
    // SERVER START ------------------------------
    const [DATA, setData] = useState(null);
    
    // Connect to the server to get the wheel data 
    useEffect(() => {
        socket.on('DATA', (data) => {
            setData(data);
        });

        return () => {
            socket.off('DATA');
        };
    }, []);
    // SERVER END ------------------------------

    return (
        <div>
            {DATA ? (
                <>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2}px`, top: `${350}px` }}>
                        <Gear size={50} gear={DATA.GEAR} />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 - 155}px`, top: `${200}px` }}>
                        <Tachometer size={150} pedal={DATA.PEDAL.GAS} gear={DATA.GEAR} speed={global_speed} />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 + 155}px`, top: `${200}px` }}>
                        <Speedometer size={150} pedal={DATA.PEDAL.GAS} gear={DATA.GEAR} speed={global_speed} />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 + 370}px`, top: `${300}px` }}>
                        <FuelGauge size={75} />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 - 370}px`, top: `${300}px` }}>
                        <TempGauge size={75} />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 + 325}px`, top: `${100}px` }}>
                        <Blinker size={25} button={DATA.BUTTONS.B} side="left" />
                    </Box>
                    <Box sx={{ position: 'absolute', left: `${WIDTH / 2 - 325}px`, top: `${100}px` }}>
                        <Blinker size={25} button={DATA.BUTTONS.Y} side="right" />
                    </Box>
                </>
            ) : (
                <p>Waiting for wheel data...</p>
            )}
        </div>
    );
};

export default Dashboard;