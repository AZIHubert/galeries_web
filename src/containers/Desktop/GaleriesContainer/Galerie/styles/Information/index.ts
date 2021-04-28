import styled from 'styled-components';

const Information = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 3px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Information;
