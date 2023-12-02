// src/App.js
import React, {Button} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';  



import AddStreaksPage from "./components/AddStreaksPage.js";
import HomePage from "./components/HomePage.js";





function App() {
  const navigate = useNavigate();   

  const navigateToContacts = () => {
    navigate('/contacts');
  };

  const navigateHome = () => {
    navigate('/');
  };
  return (
    <div>
      <button onClick={navigateHome}>Home</button>
      <hr />
      <button onClick={navigateToContacts}>Contacts</button>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/add" element={<AddStreaksPage/>}/>
      </Routes>
    </div>
  );
}



export default App;
