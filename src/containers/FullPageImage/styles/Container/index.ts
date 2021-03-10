import styled from 'styled-components';

interface StylesI {
  paddingHorizontal: number;
  paddingVertical: number;
}

interface ContainerI {
  styles: StylesI
}

const Container = styled.div<ContainerI>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: ${({
    styles,
  }) => (
    `${styles.paddingVertical}px ${styles.paddingHorizontal}px`
  )};
  position: fixed;
  z-index: 101;
  top: 0;
  width: 100%;
`;

export default Container;
