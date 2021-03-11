import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  boxShadow: '5px 6px 7px -2px rgba(0,0,0,0.15)',
  colors: {
    black: '#000',
    danger: '#FC4903',
    facebook: '#3B579D',
    primary: '#7483FF',
    secondary: '#FFFFF4',
    tertiary: '#78FFF7',
    white: '#FFF',
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
  profile: {
    largest: {
      cropedImage: {
        size: 240,
        margin: 12,
        numByRow: 4,
      },
    },
    large: {
      cropedImage: {
        size: 170,
        margin: 6,
        numByRow: 4,
      },
    },
    medium: {
      cropedImage: {
        size: 160,
        margin: 5,
        numByRow: 3,
      },
    },
    small: {
      cropedImage: {
        size: 120,
        margin: 4,
        numByRow: 3,
      },
    },
    smallest: {
      cropedImage: {
        size: 90,
        margin: 3,
        numByRow: 3,
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
