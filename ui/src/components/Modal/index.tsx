import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

import CloseIcon from '../../assets/icons/plus-outline.svg';

import theme from '../../common/variables';

interface IBlur {
  active: boolean;
}

const StyledBlur = styled.div<IBlur>`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  padding: 1.5rem;
  max-width: 30rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: ${theme.shadows.lg};
`;

const StyledButtonBar = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.6;
  transform: translateY(2px) rotate(45deg);
`;

const StyledHeading = styled.h2`
  margin: 0;
  color: ${theme.colors.disabled};
`;

interface IProps {
  title: string;
  subtitle: string;
  enableSend?: boolean;
  sendBtn?: {
    onclick: any;
    text: string;
  };
}

const Modal: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <StyledBlur active={open}>
      <StyledWrapper>
        <StyledHeading>{props.title}</StyledHeading>
        <p>{props.subtitle}</p>
        {props.children}
        <StyledButtonBar>
          <Button onClick={closeModal} variant="danger">
            <StyledImage src={CloseIcon} />
          </Button>
          {props.enableSend && (
            <Button onClick={props.sendBtn && props.sendBtn.onclick} variant="primary">
              {props.sendBtn && props.sendBtn.text}
            </Button>
          )}
        </StyledButtonBar>
      </StyledWrapper>
    </StyledBlur>
  );
};

export default Modal;
