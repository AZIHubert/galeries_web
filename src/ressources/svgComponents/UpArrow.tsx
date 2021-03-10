import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    padding-bottom: 3px;
    & path {
      fill: ${({ theme }) => theme.colors.secondary};
      height: 100%;
    }
`;

function SvgUpArrow() {
  return (
    <StyledSVG
      viewBox="0 0 764.49 456.02"
    >
      <g>
        <path
          d="M741.76 333.26L382.28 0 22.73 333.26c-30.31 28.08-30.31 73.62 0 101.7C53 463 102.15 463 132.45 435l249.79-231.56L632 435c30.3 28.08 79.42 28.08 109.72 0 30.34-28.12 30.34-73.66.04-101.74z"
        />
      </g>
    </StyledSVG>
  );
}

export default SvgUpArrow;
