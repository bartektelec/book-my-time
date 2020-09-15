import React, { useState, useCallback } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useParams } from 'react-router-dom';

const copyToClipboard = (text: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const SuccessInit: React.FC = () => {
  const { id } = useParams();
  const [copyButtonText, setCopyButtonText] = useState('Copy to clipboard');
  const personalLink = `http://bookmytime.com/calendar/${id}`;

  const copyButtonOnclick = useCallback(() => {
    copyToClipboard(personalLink);
    setCopyButtonText('Copied!');
  }, []);

  return (
    <Container>
      <h1>Book My Time</h1>
      <h2>Welcome</h2>
      <p>
        Congratulations! Your calendar has been set up, provide this link to people to let them schedule meetings with
        you:
      </p>
      <a href={personalLink}>{personalLink}</a>
      <Button onClick={() => copyButtonOnclick()} my="1rem" w="50px" variant="secondary">
        {copyButtonText}
      </Button>
    </Container>
  );
};

export default SuccessInit;
