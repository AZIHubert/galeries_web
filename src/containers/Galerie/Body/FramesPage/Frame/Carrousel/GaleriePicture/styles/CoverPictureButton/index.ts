import styled from 'styled-components';

const CoverPictureButton = styled.button.attrs(
  () => ({
    className: 'coverPictureButton',
  }),
)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  opacity: 0;
  padding: 2px 8px;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: ${({ theme }) => `opacity ${theme.transition.default}`};
`;

export default CoverPictureButton;
