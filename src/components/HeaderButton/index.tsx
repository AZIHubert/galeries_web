import * as React from 'react';

import { Button } from './styles';

type Variant = 'primary' | 'secondary';

interface HeaderButtonI {
  marginLeft?: number;
  marginRight?: number;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  testId?: string;
  title: string;
  variant?: Variant;
}

const HeaderButton = ({
  marginLeft = 0,
  marginRight = 0,
  onClick,
  testId,
  title,
  variant = 'primary',
}: HeaderButtonI) => (
  <Button
    testId={testId}
    marginLeft={marginLeft}
    marginRight={marginRight}
    onClick={onClick}
    variant={variant}
  >
    {title}
  </Button>
);

export default HeaderButton;
