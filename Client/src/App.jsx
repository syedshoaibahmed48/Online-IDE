import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CodeLabPage from './Routes/CodeLabPage';
import LandingPage from './Routes/LandingPage';
import CodeRoomPage from './Routes/CodeRoomPage';
import NotFoundPage from './Routes/NotFoundPage';
import AuthPage from './Routes/AuthPage';
import DashboardPage from './Routes/DashboardPage';
import ProjectPage from './Routes/ProjectPage';
import CollabProjectPage from './Routes/CollabProjectPage';
import AboutUsPage from './Routes/AboutUsPage';
import ContactUsPage from './Routes/ContactUsPage';


function App() {

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/codelab' element={<CodeLabPage/>}/>
        <Route path='/coderoom/:roomId' element={<CodeRoomPage/>}/>
        <Route path='/notfound' element={<NotFoundPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/project/:projectId' element={<ProjectPage/>}/>
        <Route path='/collabproject/:projectId' element={<CollabProjectPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/contactus' element={<ContactUsPage/>}/>
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;