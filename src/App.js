import React, {Button} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';  
import AddStreaksPage from "./components/AddStreaksPage.js";
import HomePage from "./components/HomePage.js"; 
import EditStreaks from "./components/EditStreaks.js"; 
import UserStreaksPage from "./components/UserStreaksPage.js";
import EditAndDeleteStreaksPage from "./components/EditAndDeleteStreaksPage.js";

function App() {
  const navigate = useNavigate();   

  const navigateToAddStreaks = () => {
    navigate('/add');
  };

  const navigateHome = () => {
    navigate('/home');
  };  

  const navigateToEditStreaks = () => {
    navigate("/edit");
  };  

  const navigateToDeleteStreaks = () => {
    navigate("/change");
  }; 


  return (
    <div>
      <button onClick={navigateHome}>home</button>
      <button onClick={navigateToAddStreaks}>add</button>
      <button onClick={navigateToEditStreaks}>edit days</button>
      <button onClick={navigateToDeleteStreaks}>edit streak</button>
      <hr/>
      <Routes>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/add" element={<AddStreaksPage/>}/>
        <Route exact path="/edit" element={<EditStreaks/>}/>
        <Route exact path="/change" element={<EditAndDeleteStreaksPage/>}/>
        <Route path="/streaks/user/:user_id/" element={<UserStreaksPage/>} />
      </Routes>
    </div>
  );
}

export default App;
