import React, {Button} from 'react';  

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react"; 

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key"
} 

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function HomePage() { 
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div>
        <header>
          <div>
            <h1>welcome to streaks</h1>
            <UserButton />
          </div>
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
    </ClerkProvider>
  );
} 

export default HomePage;
