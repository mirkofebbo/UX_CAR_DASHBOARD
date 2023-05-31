import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
// Server
import { SocketContext } from './components/SocketContext';
import { io } from "socket.io-client";

import theme from './theme';

import ControlCenter from './page/ControlCenter';
import Dashboard from './page/Dashboard';
import ViewSonic from './page/ViewSonic';
import LeftMirror from './page/LeftMirror';
import RightMirror from './page/RightMirror';
import Hud from './page/Hud';

const App = () => {
  const socketRef = useRef(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    socketRef.current.on('connect', () => {
      setIsSocketReady(true);
      setSocketError(null);
    });
    socketRef.current.on('connect_error', (error) => {
      setSocketError(error.message);
    });
    return () => socketRef.current.close();
  }, []);

  return (
    <SocketContext.Provider value={socketRef}>
      <ThemeProvider theme={theme}>
        <Router>
          {isSocketReady ? (
            <Routes>
              <Route exact path="/" element={<ControlCenter />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/LeftMirror" element={<LeftMirror />} />
              <Route path="/RightMirror" element={<RightMirror />} />
              <Route path="/ViewSonic" element={<ViewSonic />} />
              <Route path="/Hud" element={<Hud />} />
            </Routes>
          ) : (
            socketError ? <div>Error connecting to server: {socketError}</div> : <div>Connecting to server...</div>
          )}
        </Router>
      </ThemeProvider>
    </SocketContext.Provider>
  );
};


export default App;
