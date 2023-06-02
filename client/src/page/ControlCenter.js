import React, { useState, useContext } from 'react';
import { SocketContext } from '../components/SocketContext';
import { io } from "socket.io-client";
import { SERVER_IP } from '../config';

import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';

const ControlCenter = () => {
    // SERVER START ------------------------------
    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [saveData, setSaveData] = useState(false);
    const [animationCount, setAnimationCount] = useState(''); // New state for the animation count
    const [animationStates, setAnimationStates] = useState({});

    const handleOpen = (path) => {
        window.open(path, '_blank');
    }

    // TRANSMITING MESSAGE
    const handleSend = () => {
        if (!socket.current) {
            socket.current = io(`http://${SERVER_IP}:3000`);
            socket.current.on('connect', () => {
                console.log('Connected to server, socket id:', socket.current.id);
            });
            socket.current.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }
        socket.current.emit('customMessage', message); // Emit the message
        console.log('customMessage', message);
        setMessage('');  // clear the message input field
    }

    // DATA RECORDING  
    const handleSaveData = () => {
        setSaveData(true);
        socket.current.emit('startSaveData');
    }

    const handleStopSaveData = () => {
        setSaveData(false);
        socket.current.emit('stopSaveData');
    }

    // ANIMATION
    const handleAnimationCountChange = (event) => {
        const count = event.target.value;
        setAnimationCount(count);

        // Initialize animation states
        const newAnimationStates = {};
        for (let i = 1; i <= count; i++) {
            newAnimationStates[i] = false;
        }
        setAnimationStates(newAnimationStates);
    }
    const handleAnimationStateChange = (animation) => (event) => {
        setAnimationStates(prevStates => ({
            ...prevStates,
            [animation]: event.target.checked,
        }));

        // Emit an event to start or stop the animation based on the switch state
        if (event.target.checked) {
            // Start the animation
            socket.current.emit('startAnimation', animation);
        } else {
            // Stop the animation
            socket.current.emit('stopAnimation', animation);
        }
    }

    // SERVER END ------------------------------

    return (
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button onClick={() => handleOpen('/Dashboard')}>Dashboard</Button>
            <Button onClick={() => handleOpen('/LeftMirror')}>LeftMirror</Button>
            <Button onClick={() => handleOpen('/RightMirror')}>RightMirror</Button>
            <Button onClick={() => handleOpen('/ViewSonic')}>ViewSonic</Button>
            <Button onClick={() => handleOpen('/Hud')}>Hud</Button>
            <TextField value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter message..." />
            <Button onClick={handleSend}>Send Message</Button>
            {!saveData ? (
                <Button onClick={handleSaveData}>Start Saving Data</Button>
            ) : (
                <Button onClick={handleStopSaveData}>Stop Saving Data</Button>
            )}
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="animation-count-label">Animation Count</InputLabel>
                <Select
                    labelId="animation-count-label"
                    id="animation-count"
                    value={animationCount}
                    label="Animation Count"
                    onChange={handleAnimationCountChange}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                        <MenuItem key={count} value={count}>{count}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {Object.entries(animationStates).map(([animation, state]) => (
                <Box key={animation} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => { /* Code to start/stop animation here... */ }}>
                        Animation {animation}
                    </Button>
                    <Switch
                        checked={state}
                        onChange={handleAnimationStateChange(animation)}
                        inputProps={{ 'aria-label': `Switch for animation ${animation}` }}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default ControlCenter;
