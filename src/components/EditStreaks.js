import React, { useEffect, useState } from 'react';
import {
  ClerkProvider,
  SignedIn,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";

import './EditStreaksPage.css'; 

function EditStreaksPage() {
  const { userId } = useAuth();
  const { signedIn, user } = useUser();
  const [streaks, setStreaks] = useState([]); 

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await fetch(`https://streaks-backend-newer.onrender.com/streaks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${await getToken()}`,
          },
          mode: 'cors',
        });
        if (response.ok) {
          const streaksData = await response.json();
          setStreaks(streaksData);
        } else {
          console.error('Failed to fetch streaks data');
        }
      } catch (error) {
        console.error('Error fetching streaks data:', error);
      }
    };
    fetchStreaks();
  }, []);

  const handleIncrement = (streakId) => {
    setStreaks((prevStreaks) => {
      return prevStreaks.map((streak) =>
        streak.streak_id === streakId
          ? { ...streak, streak_day: streak.streak_day + 1 }
          : streak
      );
    });
  };

  const handleDecrement = (streakId) => {
    setStreaks((prevStreaks) => {
      return prevStreaks.map((streak) =>
        streak.streak_id === streakId
          ? { ...streak, streak_day: streak.streak_day - 1 }
          : streak
      );
    });
  }; 


  const handleSave = async () => { 
    try {
      const response = await fetch(`https://streaks-backend-newer.onrender.com/streaks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${await getToken()}`,
        },
        mode: 'cors',
        body: JSON.stringify({ userId, streaks }),
      });

      if (response.ok) {
        console.log('Streaks updated successfully');
      } else {
        console.error('Failed to update streaks');
      }
    } catch (error) {
      console.error('Error updating streaks:', error);
    }
  };

  return (
    <div>
      <header>
        <h1>edit your streaks</h1>
        <h3>manage your streaks</h3>
        <UserButton />
      </header>
      <main>
        <section>
          <h2>Your Streaks</h2>
          <ul className="streak-list">
            {streaks.map((streak) => (
              <li key={streak.streak_id} className="streak-item">
                <span>{`${streak.streak_name} - ${streak.streak_day} days`}</span>
                <div className="streak-buttons">
                  <button onClick={() => handleIncrement(streak.streak_id)}>+</button>
                  <button onClick={() => handleDecrement(streak.streak_id)}>-</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr />

        <button onClick={handleSave}>Save</button>
      </main>
      <footer>
        <p>&copy; 2023 streaks. made by sansu</p>
      </footer>
    </div>
  );
}

export default EditStreaksPage;
