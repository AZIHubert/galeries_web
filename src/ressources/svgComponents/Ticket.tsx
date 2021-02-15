import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path, & circle {
        fill: ${({ theme }) => theme.colors.primary}
    }
`;

function SvgTicket() {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 416.42 1924"
    >
      <g id="ticket_svg__Layer_2" data-name="Layer 2">
        <g id="ticket_svg__Layer_1-2" data-name="Layer 1">
          <path
            className="ticket_svg__cls-1"
            d="M208.21 0C90.83 0-3.35 107.22.09 236.93l23.72 983.64c0 112.35 82.38 203.43 184 203.43s184-91.08 184-203.43l24.51-983.41C419.87 107.36 325.67 0 208.21 0z"
          />
          <circle
            className="ticket_svg__cls-1"
            cx={207.81}
            cy={1740}
            r={184}
          />
        </g>
      </g>
    </StyledSVG>
  );
}

export default SvgTicket;
