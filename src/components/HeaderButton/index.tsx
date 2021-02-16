import * as React from 'react';

import { Button } from './styles';

type Variant = 'primary' | 'secondary';

interface HeaderButtonI {
  marginLeft?: number;
  marginRight?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  small?: boolean;
  testId?: string;
  title: string;
  variant?: Variant;
}

const HeaderButton = ({
  marginLeft = 0,
  marginRight = 0,
  onClick,
  small = false,
  testId,
  title,
  variant = 'primary',
}: HeaderButtonI) => (
  <Button
    marginLeft={marginLeft}
    marginRight={marginRight}
    onClick={onClick}
    small={small}
    testId={testId}
    variant={variant}
  >
    {title}
  </Button>
);

export default HeaderButton;
