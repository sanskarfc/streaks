import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";

function EditAndDeleteStreaksPage() { 
  const { getToken } = useAuth();

  const [allStreaks, setAllStreaks] = useState([]);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [editedStreakName, setEditedStreakName] = useState('');

  useEffect(() => {
    const fetchAllStreaks = async () => {
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
          setAllStreaks(streaksData);
        } else {
          console.error('Failed to fetch streaks data');
        }
      } catch (error) {
        console.error('Error fetching streaks data:', error);
      }
    };

    fetchAllStreaks();
  }, []);

  const handleEdit = async () => {
    if (selectedStreak) {
      try {
        const response = await fetch(`https://streaks-backend-newer.onrender.com/streaks/${selectedStreak.streak_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ streakName: editedStreakName }),
        });
        if (response.ok) {
          console.log('Streak name updated successfully');
          // Update the local state after successful edit
          setAllStreaks((prevStreaks) =>
            prevStreaks.map((streak) =>
              streak.streak_id === selectedStreak.streak_id
                ? { ...streak, streak_name: editedStreakName }
                : streak
            )
          );
          // Clear selected streak and edited name
          setSelectedStreak(null);
          setEditedStreakName('');
        } else {
          console.error('Failed to update streak name');
        }
      } catch (error) {
        console.error('Error updating streak name:', error);
      }
    }
  };

  const handleDelete = async (streakId) => {
    try {
      const response = await fetch(`https://streaks-backend-newer.onrender.com/streaks/${streakId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Streak deleted successfully');
        // Update the local state after successful delete
        setAllStreaks((prevStreaks) => prevStreaks.filter((streak) => streak.streak_id !== streakId));
        // Clear selected streak and edited name
        setSelectedStreak(null);
        setEditedStreakName('');
      } else {
        console.error('Failed to delete streak');
      }
    } catch (error) {
      console.error('Error deleting streak:', error);
    }
  };

  return (
    <div>
      <h1>Edit and Delete Streaks</h1>
      <ul>
        {allStreaks.map((streak) => (
          <li key={streak.streak_id}>
            {selectedStreak === streak ? (
              <>
                <label>
                  Streak Name:
                  <input
                    type="text"
                    value={editedStreakName}
                    onChange={(e) => setEditedStreakName(e.target.value)}
                  />
                </label>
                <button onClick={handleEdit}>Save Changes</button>
              </>
            ) : (
              <>
                <span>{streak.streak_name}</span>
                <button onClick={() => setSelectedStreak(streak)}>Edit</button>
                <button onClick={() => handleDelete(streak.streak_id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditAndDeleteStreaksPage;
