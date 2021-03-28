import styled from 'styled-components';

const CoverPictureButton = styled.div.attrs(
  () => ({
    className: 'coverPictureButton',
  }),
)`
  opacity: 0;
  position: absolute;
  top: 20px;
  transition: ${({ theme }) => `opacity ${theme.transition.default}`};
  right: 20px;
`;

export default CoverPictureButton;
