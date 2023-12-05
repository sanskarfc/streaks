import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from "@clerk/clerk-react";
import './EditAndDeleteStreaksPage.css'; // Import your CSS file

function EditAndDeleteStreaksPage() { 
  const { getToken } = useAuth();

  const [allStreaks, setAllStreaks] = useState([]);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [editedStreakName, setEditedStreakName] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
          setSuccess('Streak name updated successfully!');
          setError(null);
        } else {
          console.error('Failed to update streak name');
          setSuccess(null);
          setError('Failed to update streak name. Please try again.');
        }
      } catch (error) {
        console.error('Error updating streak name:', error);
        setSuccess(null);
        setError('An unexpected error occurred. Please try again later.');
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
        setSuccess('Streak deleted successfully!');
        setError(null);
      } else {
        console.error('Failed to delete streak');
        setSuccess(null);
        setError('Failed to delete streak. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting streak:', error);
      setSuccess(null);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="edit-delete-container">
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <h1>edit and delete streaks</h1>
      <ul className="streak-list">
        {allStreaks.map((streak) => (
          <li key={streak.streak_id} className="streak-item">
            {selectedStreak === streak ? (
              <>
                <label>
                  streak name:
                  <input
                    type="text"
                    value={editedStreakName}
                    onChange={(e) => setEditedStreakName(e.target.value)}
                  />
                </label>
                <Button variant="success" onClick={handleEdit}>save changes</Button>
              </>
            ) : (
              <>
                <span>{streak.streak_name}</span>
                <Button variant="warning" onClick={() => setSelectedStreak(streak)}>edit</Button>
                <Button variant="danger" onClick={() => handleDelete(streak.streak_id)}>delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditAndDeleteStreaksPage;
