import React, {Button} from 'react';  

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react"; 
import {Routes, Route, useNavigate} from 'react-router-dom';  

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key"
} 

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function HomePage() {  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
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
                to keep you motivated and on track
              </p>
            </section>
          </main>
          <footer>
            <p>&copy; 2023 streaks. made by sansu</p>
          </footer> 
        </div>
      </SignedIn>
    </ClerkProvider>
  );
} 

export default HomePage;
