import styled from 'styled-components';

const Title = styled.h2`
  border-bottom: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 40px;
  padding-bottom: 10px;
  width: 100%;
`;

export default Title;
