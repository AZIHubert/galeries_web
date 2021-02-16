import styled from 'styled-components';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';
type TitleWeight = 'bold' | 'normal';

interface TitleI {
  titleMarginTop?: number;
  textAlign?: TextAlign;
  titleSize?: number;
  titleWeight?: TitleWeight;
}

const Title = styled.h3<TitleI>`
  font-size: ${({ titleSize }) => (
    titleSize ? `${titleSize}rem` : '1.3rem'
  )};
  line-height: 1.3rem;
  margin-bottom: 25px;
  margin-top: ${({ titleMarginTop }) => (
    `${titleMarginTop}px`
  )};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ titleWeight }) => (
    titleWeight || 'normal'
  )}
`;

Title.defaultProps = {
  titleMarginTop: 0,
  textAlign: 'left',
  titleSize: 1.3,
  titleWeight: 'normal',
};

export default Title;
