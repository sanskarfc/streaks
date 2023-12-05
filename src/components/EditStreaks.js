import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
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
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
        setSuccess('Streaks saved successfully!');
        setError(null);
      } else {
        console.error('Failed to update streaks');
        setSuccess(null);
        setError('Failed to save streaks. Please try again.');
      }
    } catch (error) {
      console.error('Error updating streaks:', error);
      setSuccess(null);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <main>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <section>
          <h2>edit your streak days</h2>
          <ul className="streak-list">
            {streaks.map((streak) => (
              <li key={streak.streak_id} className="streak-item">
                <span>{`${streak.streak_name} - ${streak.streak_day} days`}</span>
                <div className="streak-buttons">
                  <Button onClick={() => handleIncrement(streak.streak_id)}>+</Button>
                  <Button onClick={() => handleDecrement(streak.streak_id)}>-</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr />

        <Button variant="success" onClick={handleSave}>Save</Button>
      </main>
      <footer>
        <p>&copy; 2023 streaks. made by sansu</p>
      </footer>
    </div>
  );
}

export default EditStreaksPage;
