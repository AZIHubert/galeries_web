import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path {
        fill: ${({ theme }) => theme.colors.primary}
    }
`;

function SvgCreateGalerie() {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 893 893"
    >
      <g id="createGalerie_svg__Layer_2" data-name="Layer 2">
        <g id="createGalerie_svg__Layer_1-2" data-name="Layer 1">
          <path
            className="createGalerie_svg__cls-1"
            d="M711.5 0h-530C81.42 0 0 81.42 0 181.5v530C0 811.58 81.42 893 181.5 893h530C811.58 893 893 811.58 893 711.5v-530C893 81.42 811.58 0 711.5 0zM818 711.5A106.63 106.63 0 01711.5 818h-530A106.63 106.63 0 0175 711.5v-530A106.63 106.63 0 01181.5 75h530A106.63 106.63 0 01818 181.5z"
          />
          <path
            className="createGalerie_svg__cls-1"
            d="M484 222.94h-75V409H222.94v75H409v186.06h75V484h186.06v-75H484V222.94z"
          />
        </g>
      </g>
    </StyledSVG>
  );
}

export default SvgCreateGalerie;
