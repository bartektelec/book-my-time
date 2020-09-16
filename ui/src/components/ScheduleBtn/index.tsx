import React from 'react';
import styled from 'styled-components';
import variables from '../../common/variables';
import PlusIcon from '../../assets/icons/plus-outline.svg';
import DenyIcon from '../../assets/icons/slash-outline.svg';

interface IProps {
  variant?: string;
}

interface StyledProps {
  bgc?: string;
  cursor?: string;
}

const StyledButton = styled.button<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
  border-radius: 15px;
  border: none;
  cursor: ${({ cursor }) => cursor && cursor};
  transition: filter 0.2s ease;
  background-color: ${({ bgc }) => (bgc ? variables.backgroundColors[bgc] : variables.backgroundColors.disabled)};
  :hover,
  :focus {
    outline: none;
    filter: brightness(0.9) contrast(1.1);
  }

  :disabled {
  }
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.6;
`;

const ScheduleBtn: React.FC<IProps> = (props) => {
  let buttonProps = {
    hasIcon: false,
    btn: {},
    img: {},
  };
  switch (props.variant) {
    case 'free':
      buttonProps = {
        hasIcon: true,
        btn: {
          bgc: 'primary',
          cursor: 'pointer',
        },
        img: {
          src: PlusIcon,
          alt: 'Add event icon',
        },
      };
      break;
    case 'busy':
      buttonProps = {
        hasIcon: true,
        btn: {
          bgc: 'disabled',
          cursor: 'not-allowed',
          disabled: 'true',
        },
        img: {
          src: DenyIcon,
          alt: 'Busy icon',
        },
      };
      break;
    default:
      buttonProps.hasIcon = false;
      buttonProps.btn = {
        bgc: 'unavailable',
        cursor: 'not-allowed',
        disabled: 'true',
      };
  }
  return (
    <StyledButton {...buttonProps.btn}>
      {buttonProps.hasIcon ? <StyledImage {...buttonProps.img} /> : null}
    </StyledButton>
  );
};

export default ScheduleBtn;
