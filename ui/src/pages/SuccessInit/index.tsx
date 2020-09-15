import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Container from '../../components/Container';

interface IProps {
  userId: string;
}

const SuccessInit: React.FC<IProps> = ({ userId }) => {
  const personalLink = `http://bookmytime.com/calendar/${userId}`;
  return (
    <Container>
      <h1>Book My Time</h1>
      <h2>Welcome</h2>
      <p>
        Congratulations! Your calendar has been set up, provide this link to people to let them schedule meetings with
        you:
      </p>
      <a href={personalLink}>{personalLink}</a>
      <Button color="secondary">Copy to clipboard</Button>
    </Container>
  );
};

export default SuccessInit;
