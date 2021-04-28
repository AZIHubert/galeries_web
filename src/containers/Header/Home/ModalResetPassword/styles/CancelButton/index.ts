import styled from 'styled-components';

interface CancelButtonI {
  testId?: string;
}

const CancelButton = styled.button.attrs<CancelButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<CancelButtonI>`
  color: ${({ theme }) => theme.colors.primary};
`;

export default CancelButton;
