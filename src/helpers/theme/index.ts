import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  boxShadow: '5px 6px 7px -2px rgba(0,0,0,0.15)',
  colors: {
    black: '#000',
    danger: '#FC4903',
    facebook: '#3B579D',
    primary: '#7483FF',
    quaternay: '#f1f1e7',
    secondary: '#FFFFF4',
    tertiary: '#78FFF7',
    white: '#FFF',
  },
  galerie: {
    largest: {
      card: {
        size: 240,
        margin: 20,
        numByRow: 4,
      },
    },
    large: {
      card: {
        size: 210,
        margin: 15,
        numByRow: 3,
      },
    },
    medium: {
      card: {
        size: 190,
        margin: 15,
        numByRow: 3,
      },
    },
    small: {
      card: {
        size: 200,
        margin: 15,
        numByRow: 2,
      },
    },
    smallest: {
      card: {
        size: 250,
        margin: 15,
        numByRow: 1,
      },
    },
  },
  header: {
    dashboard: {
      height: {
        large: 70,
        medium: 55,
        small: 45,
      },
      logoWidth: {
        large: 30,
        medium: 22,
        small: 17,
      },
    },
    home: {
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
