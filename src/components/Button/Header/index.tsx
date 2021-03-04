import * as React from 'react';

import { Button } from './styles';

type Variant = 'primary' | 'secondary';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface HeaderI {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  small?: boolean;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
  title: string;
  variant?: Variant;
}

const Header = ({
  onClick,
  small = false,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  testId,
  title,
  variant = 'primary',
}: HeaderI) => (
  <Button
    onClick={onClick}
    small={small}
    styles={styles}
    stylesMobile={stylesMobile}
    stylesTablet={stylesTablet}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    testId={testId}
    variant={variant}
  >
    {title}
  </Button>
);

export default Header;
