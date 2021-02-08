import * as React from 'react';

import { Button } from './styles';

type Type = 'button' | 'submit' | 'reset';

interface GradientButtonI {
  disabled: boolean;
  marginBottom?: number;
  marginTop?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  testid?: string;
  title: string;
  type: Type;
}

const GradientButton = ({
  disabled = false,
  marginBottom = 0,
  marginTop = 0,
  onClick,
  testid,
  title,
  type = 'button',
}: GradientButtonI) => (
  <Button
    data-testid={testid}
    disabled={disabled}
    marginBottom={marginBottom}
    marginTop={marginTop}
    onClick={onClick}
    type={type}
  >
    {disabled ? 'loading' : title}
  </Button>
);

export default GradientButton;
