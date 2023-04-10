import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CodeLabPage from './Routes/CodeLabPage';
import LandingPage from './Routes/LandingPage';
import CodeRoomPage from './Routes/CodeRoomPage';
import NotFoundPage from './Routes/NotFoundPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/codelab' element={<CodeLabPage/>}/>
          <Route path='/coderoom/:roomid' element={<CodeRoomPage/>}/>
          <Route path='/notfound' element={<NotFoundPage/>}/>
          <Route path="*" element={<Navigate to="/notfound" replace />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
