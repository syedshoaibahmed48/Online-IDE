import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CodeEditorPage from './Routes/CodeEditorPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CodeEditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
