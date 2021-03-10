import styled from 'styled-components';

interface BackgroundI {
  uri: string;
}

const Background = styled.div<BackgroundI>`
  background-image: ${({ uri }) => `url("${uri}")`};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(30px);
  height: 100vh;
  left: 0;
  opacity: 0.75;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: -1;
`;

export default Background;
