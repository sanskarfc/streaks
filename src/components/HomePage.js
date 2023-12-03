import React, { useEffect, useState } from 'react';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import './HomePage.css'; // Import your CSS file for styles

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function HomePage() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { signedIn, user } = useUser();
  const [streaks, setStreaks] = useState([]);
  const [shareableLink, setShareableLink] = useState(`https://streaks-eosin.vercel.app/user/${userId}/streaks`);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await fetch('https://streaks-backend-newer.onrender.com/streaks');
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
  }, [userId]);

  const copyToClipboard = () => {
    const linkInput = document.getElementById('shareableLink');
    if (linkInput) {
      linkInput.select();
      document.execCommand('copy');
    }
  };

  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div>
          <header>
            <h1>welcome to streaks</h1>
            <h3>manage profile</h3>
            <UserButton />
          </header>
          <main>
            <section>
              <h2>what is streaks?</h2>
              <p>
                streaks is used to share your streaks with everyone
                to keep you motivated and on track.
              </p>
            </section>

            <hr />

            {/* Display streaks as cards */}
            <h2>your streaks</h2>
            <section className="streak-cards-container">
              {streaks.map((streak) => (
                <div key={streak.streak_id} className="streak-card">
                  <h3>{streak.streak_name}</h3>
                  <p>Days: {streak.streak_day}</p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </section>

            <hr />

            <h2>your shareable link</h2>
            <div>
              <input id="shareableLink" type="text" value={shareableLink} readOnly />
              <button onClick={copyToClipboard}>Copy</button>
            </div>

            <hr />

          </main>
          <footer>
            <p>&copy; 2023 streaks. made by sansu</p>
          </footer>
        </div>
      </SignedIn>
    </div>
  );
}

export default HomePage;
