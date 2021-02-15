import styled from 'styled-components';

const Background = styled.div.attrs(() => ({
  className: 'background-container',
}))`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 100%;
`;

export default Background;
