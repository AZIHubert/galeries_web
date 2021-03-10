import * as React from 'react';

import { Button } from './styles';

type Variant = 'primary' | 'secondary';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface DefaultI {
  danger?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  small?: boolean;
  testId?: string;
  title: string;
  variant?: Variant;
}

const Default = ({
  danger = false,
  onClick,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  small = false,
  testId,
  title,
  variant = 'primary',
}: DefaultI) => (
  <Button
    danger={danger}
    styles={styles}
    stylesMobile={stylesMobile}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    stylesTablet={stylesTablet}
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
    }}
    small={small}
    testId={testId}
    variant={variant}
  >
    {title}
  </Button>
);

export default Default;
