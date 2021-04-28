import styled from 'styled-components';

const AddButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  bottom: 10px;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  display: flex;
  height: 25px;
  justify-content: center;
  position: absolute;
  right: 10px;
  width: 25px;
`;

export default AddButton;
