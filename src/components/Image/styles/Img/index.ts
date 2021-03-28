import styled from 'styled-components';

type Mode = 'cover' | 'contain';

interface ImgI {
  mode?: Mode;
}

const Img = styled.img<ImgI>`
  height: 100%;
  object-fit: ${({ mode }) => `${mode !== 'cover' ? 'contain' : 'cover'}`};
  width: ${({ mode }) => `${mode !== 'cover' ? 'auto' : '100%'}`};
`;

export default Img;
