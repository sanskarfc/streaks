import React, {Button} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';  
import AddStreaksPage from "./components/AddStreaksPage.js";
import HomePage from "./components/HomePage.js"; 

function App() {
  const navigate = useNavigate();   

  const navigateToAddStreaks = () => {
    navigate('/add');
  };

  const navigateHome = () => {
    navigate('/home');
  }; 

  return (
    <div>
      <button onClick={navigateHome}>home</button>
      <button onClick={navigateToAddStreaks}>add</button>
      <hr />
      <Routes>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/add" element={<AddStreaksPage/>}/>
      </Routes>
    </div>
  );
}



export default App;
