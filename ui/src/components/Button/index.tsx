import styled from 'styled-components';
import variables from '../../common/variables';

interface IButton {
  variant: string;
  display: string;
  mx: string;
  my: string;
  w: string;
}

const Button = styled.button<Partial<IButton>>`
  display: ${({ display }) => display || 'block'};
  margin-block-start: ${({ my }) => my || '0px'};
  margin-block-end: ${({ my }) => my || '0px'};
  margin-inline-start: ${({ mx }) => mx || '0px'};
  margin-inline-end: ${({ mx }) => mx || '0px'};
  width: ${({ w }) => w || 'auto'};
  cursor: pointer;
  border: 0;
  border-radius: 15px;
  background: ${({ variant }) => (variant ? variables.backgroundColors[variant] : variables.backgroundColors.primary)};
  padding: 1rem;
  width: 100%;
  color: ${({ variant }) => (variant ? variables.colors[variant] : '#2f855a')};
  :hover {
    filter: brightness(0.9) contrast(1.1);
  }
`;

export default Button;
