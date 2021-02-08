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
    white: '#fff',
  },
  header: {
    height: 90,
  },
  transition: {
    default: '0.3s',
    quick: '0.1s',
    slow: '0.5s',
  },
  wrapper: {
    margin: {
      large: 200,
      medium: 50,
      small: 25,
    },
  },
};

export default theme;
