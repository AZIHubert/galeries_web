import styled from 'styled-components';

interface TitleI {
  testId?: string;
  textAlign?: style.TextAlign;
  titleMarginTop?: number;
  titleSize?: number;
  titleWeight?: style.FontWeight;
}

const Title = styled.h3.attrs<TitleI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<TitleI>`
  font-size: ${({ titleSize }) => (
    titleSize ? `${titleSize}rem` : '1.3rem'
  )};
  font-weight: ${({ titleWeight }) => (
    titleWeight || 'normal'
  )};
  line-height: 1.3rem;
  margin-bottom: 25px;
  margin-top: ${({ titleMarginTop }) => (
    `${titleMarginTop}px`
  )};
  text-align: ${({ textAlign }) => textAlign};
`;

Title.defaultProps = {
  titleMarginTop: 0,
  textAlign: 'left',
  titleSize: 1.3,
  titleWeight: 'normal',
};

export default Title;
