import styled from 'styled-components';

interface ImageI {
  url: string;
}

const Image = styled.div<ImageI>`
  background: ${({ url }) => `url(${url}) no-repeat center center`};
  background-size: cover;
  width: 33.33%;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default Image;
