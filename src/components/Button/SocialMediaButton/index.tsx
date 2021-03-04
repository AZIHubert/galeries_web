import * as React from 'react';

import facebookLogo from '#ressources/images/facebookLogo.png';
import googleLogo from '#ressources/images/googleLogo.png';

import {
  Button,
  ImageContainer,
} from './styled';

type Action = 'login' | 'signin';
type Variant = 'facebook' | 'google';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface SocialMediaButtonI {
  action?: Action;
  disabled?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
  variant?: Variant;
}

const SocialMediaButton = ({
  action = 'signin',
  disabled = false,
  onClick,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  testId,
  variant = 'facebook',
}: SocialMediaButtonI) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    styles={styles}
    stylesMobile={stylesMobile}
    stylesTablet={stylesTablet}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    testId={testId}
    variant={variant}
  >
    <ImageContainer>
      <img
        alt={`logo ${variant}`}
        src={variant === 'facebook' ? facebookLogo : googleLogo}
      />
    </ImageContainer>
    {`${action === 'login'
      ? 'Log in'
      : 'Sign in'}
        with
    ${variant === 'facebook'
    ? 'Facebook'
    : 'Google'
  }`}
  </Button>
);

export default SocialMediaButton;
