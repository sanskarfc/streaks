import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddStreaksPage from "./components/AddStreaksPage.js";
import HomePage from "./components/HomePage.js";
import EditStreaks from "./components/EditStreaks.js";
import UserStreaksPage from "./components/UserStreaksPage.js";
import EditAndDeleteStreaksPage from "./components/EditAndDeleteStreaksPage.js"; 
import TheWall from "./components/TheWall.js";
import Button from 'react-bootstrap/Button';

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

  const navigateToTheWall = () => {
    navigate("/wall");
  }

  return (
    <div>
      <header className="d-flex justify-content-around mb-3">
        <Button variant="outline-primary" onClick={navigateHome}>home</Button>
        <Button variant="outline-primary" onClick={navigateToAddStreaks}>add</Button>
        <Button variant="outline-primary" onClick={navigateToEditStreaks}>edit days</Button>
        <Button variant="outline-primary" onClick={navigateToDeleteStreaks}>edit streak</Button>
        <Button variant="outline-primary" onClick={navigateToTheWall}>the wall</Button>
      </header>
      <hr />
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/add" element={<AddStreaksPage />} />
        <Route exact path="/edit" element={<EditStreaks />} />
        <Route exact path="/change" element={<EditAndDeleteStreaksPage />} />
        <Route exact path="/wall" element={<TheWall />} />
        <Route path="/streaks/user/:user_id/" element={<UserStreaksPage />} />
      </Routes>
    </div>
  );
}

export default App;
