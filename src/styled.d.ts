import 'styled-components';

interface ColorsI {
  black: string;
  danger: string;
  facebook: string;
  primary: string;
  secondary: string;
  tertiary: string;
  white: string;
}

interface HeaderHeightI {
  large: number;
  medium: number;
  small: number;
}

interface HeaderLogoI {
  large: number;
  medium: number;
  small: number;
}

interface HeaderI {
  height: HeaderHeightI;
  logoWidth: HeaderLogoI;
}

interface TransitionI {
  default: string;
  quick: string;
  slow: string;
}

interface WrapperMarginI {
  large: number;
  medium: number;
  small: number;
  smallest: number;
}

interface WrapperI {
  margin: WrapperMarginI;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    boxShadow: string;
    colors: ColorsI;
    header: HeaderI;
    transition: TransitionI;
    wrapper: WrapperI;
  }
}
