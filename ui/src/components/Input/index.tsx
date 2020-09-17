import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../common/variables';

const StyledInput = styled.input`
  background: none;
  flex-grow: 1;
  border: none;
  border-bottom: 2px solid ${theme.colors.disabled};
  padding: 0px 1rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  :focus {
    outline: 0;
    border-bottom: 2px solid ${theme.colors.secondary};
  }

  :focus + label,
  :not(:placeholder-shown) + label {
    color: ${theme.colors.secondary};
    transform: translate(-0.5rem, 0rem) scale(0.9);
  }

  :not(:placeholder-shown) + label {
    color: ${theme.colors.primary};
  }
`;

const StyledLabel = styled.label`
  width: 100%;
  color: ${theme.colors.disabled};
  overflow: hidden;
  background-color: white;
  text-overflow: ellipsis;
  transform: translate(1rem, 1.4rem);
  transition: all 0.2s ease;
`;

const StyledFieldWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column-reverse;
  background-color: white;
  margin-bottom: 1rem;
  height: 3rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledImage = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;

interface IProps {
  placeholder: string;
  type: string;
  label: string;
  icon?: string;
}

const Input: React.FC<IProps> = (props) => {
  const idName = props.label.replace(' ', '');
  return (
    <StyledWrapper>
      {props.icon && <StyledImage src={props.icon} alt={`${props.label} icon`} />}
      <StyledFieldWrapper>
        <StyledInput id={idName} placeholder={props.placeholder} type="text" />
        <StyledLabel htmlFor={idName}>{props.label}</StyledLabel>
      </StyledFieldWrapper>
    </StyledWrapper>
  );
};

export default Input;
