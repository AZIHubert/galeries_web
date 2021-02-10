import styled from 'styled-components';

interface CancelButtonI {
  testId?: string;
}

const CancelButton = styled.button.attrs<CancelButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<CancelButtonI>`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export default CancelButton;
