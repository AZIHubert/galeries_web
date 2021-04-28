import 'styled-components';

interface ColorsI {
  black: string;
  danger: string;
  facebook: string;
  primary: string;
  quaternay: string;
  secondary: string;
  tertiary: string;
  white: string;
}

interface GalerieI {
  largest: SubGalerieI;
  large: SubGalerieI;
  medium: SubGalerieI;
  small: SubGalerieI;
  smallest: SubGalerieI;
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

interface SubHeaderI {
  height: HeaderHeightI;
  logoWidth: HeaderLogoI;
}

interface SubGalerieI {
  card: {
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
    galerie: GalerieI;
    header: HeaderI;
    transition: TransitionI;
    wrapper: WrapperI;
  }
}
