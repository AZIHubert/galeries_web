import styled from 'styled-components';

const Circle = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  height: 6px;
  margin: 0 3px 5px 0;
  opacity: 0.5;
  width: 6px;
`;

export default Circle;
