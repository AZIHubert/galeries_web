import styled from 'styled-components';

interface BackgroundI {
  testId?: string;
}

const Background = styled.div.attrs<BackgroundI>(
  ({ testId }) => ({
    'data-testid': testId,
    className: 'background-modal',
  }),
)<BackgroundI>`
  background-color: #000;
  height: 100vh;
  opacity: 0.7;
  position: fixed;
  top: 0;
  width: 100%;
`;

export default Background;
