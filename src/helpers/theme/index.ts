import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  boxShadow: '5px 6px 7px -2px rgba(0,0,0,0.15)',
  colors: {
    black: '#000',
    danger: '#FF0000',
    facebook: '#3B579D',
    primary: '#7483FF',
    secondary: '#FFFFF4',
    tertiary: '#78FFF7',
    white: '#FFF',
  },
  header: {
    height: {
      large: 110,
      medium: 90,
      small: 80,
    },
    logoWidth: {
      large: 54,
      medium: 38,
      small: 34,
    },
  },
  transition: {
    default: '0.3s',
    quick: '0.1s',
    slow: '0.5s',
  },
  wrapper: {
    margin: {
      large: 260,
      medium: 130,
      small: 40,
      smallest: 25,
    },
  },
};

export default theme;
