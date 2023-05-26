import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { io } from "socket.io-client";

let socket;

const ControlCenter = () => {

    const [message, setMessage] = useState('');

    const handleOpen = (path) => {
        window.open(path, '_blank');
    }

    const handleSend = () => {
      if (!socket) {
          socket = io('http://localhost:3000');
          socket.on('connect', () => {
              console.log('Connected to server, socket id:', socket.id);
          });
          socket.on('disconnect', () => {
              console.log('Disconnected from server');
          });
      }
      socket.emit('customMessage', message); // Emit the message
      setMessage('');  // clear the message input field
  }
  

    return (
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button onClick={() => handleOpen('/Dashboard')}>Dashboard</Button>
            <Button onClick={() => handleOpen('/SideMirror')}>SideMirror</Button>
            <Button onClick={() => handleOpen('/ViewSonic')}>ViewSonic</Button>
            <Button onClick={() => handleOpen('/Hud')}>Hud</Button>
            <TextField value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter message..." />
            <Button onClick={handleSend}>Send Message</Button>
        </Box>
    );
};

export default ControlCenter;
