import styled from 'styled-components';
import variables from '../../common/variables';

interface IButton {
  color: string;
}

const Button = styled.button<Partial<IButton>>`
  cursor: pointer;
  border: 0;
  border-radius: 15px;
  background: ${({ color }) => (color ? variables.backgroundColors[color] : variables.backgroundColors.primary)};
  padding: 1rem;
  width: 100%;
  color: ${({ color }) => (color ? color : '#2f855a')};
  :hover {
    filter: brightness(0.9);
  }
`;

export default Button;
