import * as React from 'react';

import facebookLogo from '#ressources/images/facebookLogo.png';
import googleLogo from '#ressources/images/googleLogo.png';

import {
  Button,
  ImageContainer,
} from './styled';

type Action = 'login' | 'signin';
type Variant = 'facebook' | 'google';

interface SocialMediaButtonI {
  action?: Action;
  disabled?: boolean;
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  testId?: string;
  variant?: Variant;
}

const SocialMediaButton = ({
  action = 'signin',
  disabled = false,
  marginBottom = 0,
  marginBottomL = 0,
  marginTop = 0,
  marginTopL = 0,
  onClick,
  testId,
  variant = 'facebook',
}: SocialMediaButtonI) => (
  <Button
    disabled={disabled}
    marginBottom={marginBottom}
    marginBottomL={marginBottomL}
    marginTop={marginTop}
    marginTopL={marginTopL}
    onClick={onClick}
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
