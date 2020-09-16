export interface IVariables {
  colors: {
    [key: string]: string;
  };
  backgroundColors: {
    [key: string]: string;
  };
}

const variables: IVariables = {
  colors: {
    primary: '#2F855A',
    secondary: '#C05621',
    disabled: '#718096',
    danger: '#9B2C2C',
  },
  backgroundColors: {
    primary: '#9AE6B4',
    secondary: '#FEEBC8',
    disabled: '#CBD5E0',
    danger: '#FEB2B2',
    unavailable: '#E2E9F0',
  },
};

export default variables;
