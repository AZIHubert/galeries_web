import styled from 'styled-components';

type Mode = 'cover' | 'height' | 'width';

interface ImgI {
  mode?: Mode;
}

const Img = styled.img<ImgI>`
  width: ${({ mode }) => {
    if (mode === 'cover' || mode === 'width') {
      return '100%';
    }

    return 'auto';
  }};
  height: ${({ mode }) => {
    if (mode === 'cover' || mode === 'height') {
      return '100%';
    }

    return 'auto';
  }};
`;

export default Img;
