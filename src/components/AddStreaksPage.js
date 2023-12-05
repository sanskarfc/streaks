import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@clerk/clerk-react';
import './AddStreaksPage.css'; // Import your CSS file

function AddStreaksPage() {
  const [streakName, setStreakName] = useState('');
  const [streakDays, setStreakDays] = useState('');

  const handleNameChange = (e) => {
    setStreakName(e.target.value);
  };

  const handleDayChange = (e) => {
    setStreakDays(e.target.value);
  };

  const { getToken } = useAuth();

  const handleAddStreak = () => {
    const data = {
      streakName: streakName,
      streakDays: streakDays,
    };

    async function addStreak() {
      try {
        const response = await fetch(`https://streaks-backend-newer.onrender.com/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`,
          },
          mode: 'cors',
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    addStreak();
    setStreakName('');
    setStreakDays('');
  };

  return (
    <div className="add-streaks-container">
      <div className="input-section">
        <label>
          <div className="input-group">
            <span>Name of Streak:</span>
            <input type="text" value={streakName} onChange={handleNameChange} />
          </div>
          <div className="input-group">
            <span>How many days since this streak?</span>
            <input type="text" value={streakDays} onChange={handleDayChange} />
          </div>
        </label>
      </div>
      <div className="button-section">
        <Button onClick={handleAddStreak}>Add Streak</Button>
      </div>
    </div>
  );
}

export default AddStreaksPage;
