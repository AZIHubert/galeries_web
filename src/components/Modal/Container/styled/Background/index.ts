import styled from 'styled-components';

const Background = styled.div.attrs(() => ({
  className: 'background-container',
}))`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 100%;
`;

export default Background;
