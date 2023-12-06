import Button from 'react-bootstrap/Button';
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

  const { getToken } = useAuth();

  const { userId } = useAuth();
  const navigate = useNavigate();
  const { signedIn, user } = useUser();
  const [streaks, setStreaks] = useState([]);
  const [linkView, setLinkView] = useState(false);
  const [shareableLink, setShareableLink] = useState(``);

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

  const copyToClipboard = () => {
    const linkInput = document.getElementById('shareableLink');
    if (linkInput) {
      linkInput.select();
      document.execCommand('copy');
    }
  }; 

  const setTheLink = () => {
    const apiUrl = 'https://streaks-eosin.vercel.app';
    setShareableLink(`${apiUrl}/streaks/user/${userId}`);
    setLinkView(true);
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

            <h2>your streaks</h2>
            <section className="streak-cards-container">
              {streaks.map((streak) => (
                <div key={streak.streak_id} className="streak-card">
                  <h3>{streak.streak_name}</h3>
                  <p>Days: {streak.streak_day}</p>
                </div>
              ))}
            </section>

            <hr />

            <h2>your shareable link</h2>
            <div>
              <Button variant="secondary" onClick={setTheLink}>wanna share your streaks?</Button>
              {linkView && (
                <div>
                  <input id="shareableLink" type="text" value={shareableLink} readOnly />
                  <Button onClick={copyToClipboard}>Copy</Button>
                </div>
              )}
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
