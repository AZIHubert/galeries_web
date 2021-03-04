import styled from 'styled-components';

interface InnerContainerI {
  testId?: string;
}

const InnerContainer = styled.div.attrs<InnerContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<InnerContainerI>`
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  
`;

export default InnerContainer;
