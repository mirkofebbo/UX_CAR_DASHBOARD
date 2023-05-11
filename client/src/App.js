// import React, { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';

// import Speedometer from './components/Speedometer';

// const SERVER_URL = 'http://localhost:3000';

// function App() {
//   const [wheelData, setWheelData] = useState(null);

//   useEffect(() => {
//     const socket = socketIOClient(SERVER_URL);

//     socket.on('wheelData', (data) => {
//       setWheelData(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="App">
//       {wheelData ? (
//         <div>

//         <Speedometer size={{ width: 200, height: 200 }} position={{ top: 100, left: 100 }} speed={wheelData.PEDAL.GAS} />        </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default App;
