import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme          from './theme';

import ControlCenter  from './page/ControlCenter';
import Dashboard      from './page/Dashboard';
import ViewSonic      from './page/ViewSonic';
import SideMirror     from './page/SideMirror';
import Hud            from './page/Hud';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route exact path="/" element={<ControlCenter/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/SideMirror" element={<SideMirror/>}/>
        <Route path="/ViewSonic" element={<ViewSonic/>}/>
        <Route path="/Hud" element={<Hud/>}/>
      </Routes>
    </Router>
  </ThemeProvider>
);


export default App;
