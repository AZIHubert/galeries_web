import * as React from 'react';

import { Button } from './styles';

type Type = 'button' | 'submit' | 'reset';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface GradiantI {
  disabled: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
  title: string;
  type: Type;
}

const Gradiant = ({
  disabled = false,
  onClick,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  testId,
  title,
  type = 'button',
}: GradiantI) => (
  <Button
    disabled={disabled}
    styles={styles}
    stylesMobile={stylesMobile}
    stylesTablet={stylesTablet}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    onClick={onClick}
    testId={testId}
    type={type}
  >
    {disabled ? 'loading' : title}
  </Button>
);

export default Gradiant;
