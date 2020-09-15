import React, { useCallback } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';

const AUTH_URL = `http://localhost:5001/`;

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Book My Time</h1>
      <h2>Welcome</h2>
      <p>
        Book My Time creates a new Google Calendar that is synchronized with the app. People will be able to schedule
        meetings in your calendar using your personal link.
      </p>
      <p>Sign in with Google to proceed.</p>

      <form action={AUTH_URL} method="POST">
        <Button>Sign in with Google</Button>
      </form>
    </Container>
  );
};

export default Home;
