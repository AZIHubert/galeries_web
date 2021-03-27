import * as React from 'react';

import { Button } from './styles';

type Type = 'button' | 'submit' | 'reset';
type Variant = 'primary' | 'secondary';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface DefaultI {
  danger?: boolean;
  disabled?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  small?: boolean;
  testId?: string;
  title: string;
  type?: Type;
  variant?: Variant;
}

const Default = ({
  danger = false,
  disabled = false,
  onClick,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  small = false,
  testId,
  title,
  type = 'button',
  variant = 'primary',
}: DefaultI) => (
  <Button
    danger={danger}
    disabled={disabled}
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
    type={type}
    variant={variant}
  >
    {disabled ? 'loading' : title}
  </Button>
);

export default Default;
