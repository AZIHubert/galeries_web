import styled from 'styled-components';

interface BackgroundI {
  testId?: string;
}

const Background = styled.div.attrs<BackgroundI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<BackgroundI>`
  background-color: #000;
  height: 100vh;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100%;
`;

export default Background;
