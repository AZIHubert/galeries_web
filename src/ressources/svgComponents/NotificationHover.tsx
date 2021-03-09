import * as React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    height: 100%;
    & path {
        fill: ${({ theme }) => theme.colors.secondary}
    }
`;

const NotificationHover = () => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 998.13 907.88"
  >
    <g data-name="Layer 2">
      <path
        d="M913.9 85.64a287.59 287.59 0 00-406.69 0l-7.44 7.44-8.85-8.85A287.57 287.57 0 1084.23 490.92l8.85 8.85-1.42 1.42 406.69 406.69L913.9 492.34a287.58 287.58 0 000-406.7z"
        data-name="Layer 1"
      />
    </g>
  </StyledSVG>
);

export default NotificationHover;
