import styled from 'styled-components';

interface ImageI {
  url: string;
  posting: boolean;
}

const Image = styled.div<ImageI>`
  background: ${({ url }) => `url(${url}) no-repeat center center`};
  background-size: cover;
  height: 100%;
  position: absolute;
  opacity: ${({ posting }) => (posting ? 0.5 : 1)};
  transition: ${({ theme }) => (
    `opacity ${theme.transition.default}`
  )};
  width: 100%;
`;

Image.defaultProps = {
  posting: false,
};

export default Image;
