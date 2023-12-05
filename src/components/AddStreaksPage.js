import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

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
    <div>
      <div>
        <label>
          <div>
            Name of Streak:
            <input type="text" value={streakName} onChange={handleNameChange} />
          </div>
          <div>
            How many days since this streak?
            <input type="text" value={streakDays} onChange={handleDayChange} />
          </div>
        </label>
      </div>
      <div>
        <button onClick={handleAddStreak}>Add Streak</button>
      </div>
    </div>
  );
}

export default AddStreaksPage;
