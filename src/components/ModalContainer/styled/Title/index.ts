import styled from 'styled-components';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';

interface TitleI {
  textAlign?: TextAlign;
}

const Title = styled.h3<TitleI>`
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin-bottom: 25px;
  text-align: ${({ textAlign }) => textAlign};
`;

Title.defaultProps = {
  textAlign: 'left',
};

export default Title;
