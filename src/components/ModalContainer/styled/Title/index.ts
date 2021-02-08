import styled from 'styled-components';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';

interface TitleI {
  textAlign?: TextAlign;
}

const Title = styled.h3<TitleI>`
  font-size: 1.3rem;
  text-align: ${({ textAlign }) => textAlign};
  margin-bottom: 25px;
  line-height: 1.3rem;
`;

Title.defaultProps = {
  textAlign: 'left',
};

export default Title;
