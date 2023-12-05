import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '@clerk/clerk-react';

function AddStreaksPage() {
  const [streakName, setStreakName] = useState('');
  const [streakDays, setStreakDays] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleNameChange = (e) => {
    setStreakName(e.target.value);
  };

  const handleDayChange = (e) => {
    setStreakDays(e.target.value);
  };

  const { getToken } = useAuth();

  const handleAddStreak = async () => {
    const data = {
      streakName: streakName,
      streakDays: streakDays,
    };

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
      setSuccess('Streak added successfully!');
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while adding the streak. Please try again.');
      setSuccess(null);
    }

    setStreakName('');
    setStreakDays('');
  };

  return (
    <div className="container mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form>
        <Form.Group controlId="streakName">
          <Form.Label>name of streak</Form.Label>
          <Form.Control type="text" value={streakName} onChange={handleNameChange} placeholder="enter streak name" />
        </Form.Group>

        <Form.Group controlId="streakDays">
          <Form.Label>how many days since this streak?</Form.Label>
          <Form.Control type="text" value={streakDays} onChange={handleDayChange} placeholder="enter streak days" />
        </Form.Group>

        <Button variant="primary" onClick={handleAddStreak}>
          add streak
        </Button>
      </Form>
    </div>
  );
}

export default AddStreaksPage;
