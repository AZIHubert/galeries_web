import * as React from 'react';

import { Button } from './styles';

type Variant = 'primary' | 'secondary';

interface HeaderButtonI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  small?: boolean;
  testId?: string;
  title: string;
  variant?: Variant;
}

const HeaderButton = ({
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  onClick,
  small = false,
  testId,
  title,
  variant = 'primary',
}: HeaderButtonI) => (
  <Button
    marginBottom={marginBottom}
    marginLeft={marginLeft}
    marginRight={marginRight}
    marginTop={marginTop}
    onClick={onClick}
    small={small}
    testId={testId}
    variant={variant}
  >
    {title}
  </Button>
);

export default HeaderButton;
