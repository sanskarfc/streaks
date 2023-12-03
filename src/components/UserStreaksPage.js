import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserStreaksPage() {
  const { user_id } = useParams();
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    const fetchUserStreaks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/streaks/user/${user_id}`);
        if (response.ok) {
          const streaksData = await response.json();
          setStreaks(streaksData);
        } else {
          console.error('Failed to fetch user streaks');
        }
      } catch (error) {
        console.error('Error fetching user streaks:', error);
      }
    };

    fetchUserStreaks();
  }, [user_id]);

  return (
    <div>
      <h1>Streaks for User ID: {user_id}</h1>
      <section className="streak-cards-container">
        {streaks.map((streak) => (
          <div key={streak.streak_id} className="streak-card">
            <h3>{streak.streak_name}</h3>
            <p>Days: {streak.streak_day}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserStreaksPage;