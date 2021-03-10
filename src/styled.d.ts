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
  home: SubHeaderI;
  dashboard: SubHeaderI;
}

interface ProfileI {
  large: SubProfileI;
  medium: SubProfileI;
  small: SubProfileI;
  smallest: SubProfileI;
}

interface SubHeaderI {
  height: HeaderHeightI;
  logoWidth: HeaderLogoI;
}

interface SubProfileI {
  cropedImage: {
    size: number;
    margin: number;
    numByRow: number;
  }
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
    profile: ProfileI;
    transition: TransitionI;
    wrapper: WrapperI;
  }
}
