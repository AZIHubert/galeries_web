import * as React from 'react';

import { Button } from './styles';

type Type = 'button' | 'submit' | 'reset';

interface GradientButtonI {
  disabled: boolean;
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  testId?: string;
  title: string;
  type: Type;
}

const GradientButton = ({
  disabled = false,
  marginBottom = 0,
  marginBottomL = 0,
  marginTop = 0,
  marginTopL = 0,
  onClick,
  testId,
  title,
  type = 'button',
}: GradientButtonI) => (
  <Button
    disabled={disabled}
    marginBottom={marginBottom}
    marginBottomL={marginBottomL}
    marginTop={marginTop}
    marginTopL={marginTopL}
    onClick={onClick}
    testId={testId}
    type={type}
  >
    {disabled ? 'loading' : title}
  </Button>
);

export default GradientButton;
