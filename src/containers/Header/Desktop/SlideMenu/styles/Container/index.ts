import styled from 'styled-components';

const Container = styled.div.attrs(
  () => ({
    className: 'slideMenu',
  }),
)`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-x: hidden;
  padding: 15px 20px;
  position: fixed;
  right: 0;
  top: 0;
  transition: ${({ theme }) => theme.transition.default};
  z-index: 300;
`;

export default Container;
