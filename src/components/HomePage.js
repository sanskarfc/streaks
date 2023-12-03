import React, { useEffect, useState } from 'react';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import './HomePage.css'; // Import your CSS file for styles

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function HomePage() {
  const navigate = useNavigate();
  const { signedIn } = useUser();

  // State to store streaks data
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await fetch('http://localhost:3000/streaks');
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

  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div>
          <header>
            <h1>Welcome to Streaks</h1>
            <h3>Manage Profile</h3>
            <UserButton />
          </header>
          <main>
            <section>
              <h2>What is Streaks?</h2>
              <p>
                Streaks is used to share your streaks with everyone
                to keep you motivated and on track.
              </p>
            </section>

            {/* Display streaks as cards */}
            <section className="streak-cards-container">
              <h2>Your Streaks</h2>
              {streaks.map((streak) => (
                <div key={streak.streak_id} className="streak-card">
                  <h3>{streak.streak_name}</h3>
                  <p>Days: {streak.streak_day}</p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </section>
          </main>
          <footer>
            <p>&copy; 2023 Streaks. Made by Sansu</p>
          </footer>
        </div>
      </SignedIn>
    </div>
  );
}

export default HomePage;
