import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function TheWall() {
  const { getToken } = useAuth();
  const [wallData, setWallData] = useState([]);

  useEffect(() => {
    const fetchWallData = async () => {
      try {
        const response = await fetch('https://streaks-backend-newer.onrender.com/wall/streaks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${await getToken()}`,
          },
          mode: 'cors',
        });
        if (response.ok) {
          const wallStreaks = await response.json();
          setWallData(wallStreaks);
        } else {
          console.error('Failed to fetch wall data');
        }
      } catch (error) {
        console.error('Error fetching wall data:', error);
      }
    };

    fetchWallData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>The Wall</h1>
      {wallData.map((userStreaks) => (
        <Card key={userStreaks[0].user.user_id} className="mb-4">
          <Card.Header>
            <h2>{`${userStreaks[0].user.first_name} ${userStreaks[0].user.last_name}`}</h2>
          </Card.Header>
          <ListGroup variant="flush">
            {userStreaks.map((streak) => (
              <ListGroup.Item key={streak.streak_id}>
                {streak.streak_name} - {streak.streak_day} days
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ))}
    </div>
  );
}

export default TheWall;
