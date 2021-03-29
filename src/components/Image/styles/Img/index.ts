import styled from 'styled-components';

type Mode = 'cover' | 'height' | 'width' | 'fill';

interface ImgI {
  mode?: Mode;
}

const Img = styled.img<ImgI>`
  vertical-align: middle;
  width: ${({ mode }) => {
    if (mode === 'width' || mode === 'fill') {
      return '100%';
    }
    return 'auto';
  }};
  height: ${({ mode }) => {
    if (mode === 'height' || mode === 'fill') {
      return '100%';
    }
    return 'auto';
  }};
`;

export default Img;
