import styled from 'styled-components';

const Background = styled.div.attrs(
  () => ({
    className: 'background',
  }),
)`
  background-color: ${({ theme }) => theme.colors.black};
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export default Background;
