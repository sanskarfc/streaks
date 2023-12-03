import React, { useState } from 'react';

function AddStreaksPage() {
  const [streakValue, setStreakValue] = useState(''); 
  const [streakDays, setStreakDays] = useState('');


  const handleInputChange = (e) => {
    setStreakValue(e.target.value);
  }; 

  const handleAddStreak = () => {
    const data = {
      streakValue: streakValue,
      streakDays: streakDays,
    };

    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Success:', responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setStreakValue('');
    setStreakDays('');
  };

  return (
    <div>
      <div>
        <label> 
          <div>
            Name of Streak:
            <input type="text" value={streakValue} onChange={handleInputChange} />   
          </div> 
          <div> 
            How many days since this streak?
            <input type="text" value={streakDays} onChange={handleInputChange} />
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
