export interface IVariables {
  colors: {
    [key: string]: string;
  };
  backgroundColors: {
    [key: string]: string;
  };

  shadows: {
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
  shadows: {
    lg: '0px 8px 24px -8px rgba(0,0,0,.25)',
  },
};

export default variables;
