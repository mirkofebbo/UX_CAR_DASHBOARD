const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const { connectToTXRacingWheel } = require('./util/txracingwheel');
const { addDataToBuffer, formatData, startDataSave, writeDataToCsv } = require('./util/DataHandler');

const app = express();

let saveData = false;

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Allow all origins, or specify your React app's origin here
    methods: ['GET', 'POST'],
  },
});
//==== WHEEL DATA ================================================
connectToTXRacingWheel(
  (error) => {
    if (error) {
      console.error('Error:', error);
    }
  },
  (simplifiedData) => {
    console.log('Data:', simplifiedData);
    io.emit('DATA', simplifiedData);

    // Add the DATA to CSV file 
    if (saveData) {
      const formattedData = formatData(simplifiedData);
      addDataToBuffer(formattedData);
    }
  }
);

//==== MESSAGE ================================================
// handle custom messages
io.on('connect', (socket) => {
  console.log('Client connected, id:', socket.id);

  // SEDING MESSAGE 
  socket.on('customMessage', (message) => {
    console.log(`Broadcasting message: ${message}`);
    io.emit('customMessage', message);

    if (saveData) {
      const formattedData = formatData(null, message);
      addDataToBuffer(formattedData);
    }
  });

  // RECORDING DATA 
  socket.on('startSaveData', () => {
    console.log('Starting data save...');
    saveData = true;
    startDataSave();

  });
  socket.on('stopSaveData', () => {
    console.log('Saving Data');
    saveData = false;
    writeDataToCsv();
  });
  socket.on('disconnect', () => {
    console.log('Client disconnect, id:', socket.id);

  });
});

//==== ANIMATION ================================================
// handle animation change
// io.on('connection', (socket) => {
//   console.log('Client connected, id:', socket.id);

//   socket.on('customMessage', (message) => {
//     console.log(`Broadcasting message: ${message}`);
//     io.emit('customMessage', message);
// });

//   socket.on('disconnect', () => {
//     console.log(`Client ${socket.id} disconnected`);
//   });
// });
//==== USB SERVER ================================================
// Serve the React build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running`);
});

