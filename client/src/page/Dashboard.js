import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReactDOM from "react-dom/client";
import socket from '../socket';

import Speedometer from '../components/SpeedometerGrey';
import Tachometer from '../components/TachometerGrey';
import FuelGauge from '../components/FuelGauge';
import TempGauge from '../components/TempGauge';
import Gear from '../components/Gear';
import Blinker from '../components/Blinkers'


var WIDTH = 1920;
var HEIGHT = 326;
var global_speed = 0;

const Dashboard = () => {
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