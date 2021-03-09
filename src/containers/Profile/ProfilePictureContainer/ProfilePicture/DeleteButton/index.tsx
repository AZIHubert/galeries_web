import * as React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
import themeColor from '#helpers/theme';

const Container = styled.button.attrs(() => ({
  className: 'button',
}))`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.danger};
  border: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  display: flex;
  height: 25px;
  justify-content: center;
  left: 20px;
  padding: 5px;
  position: absolute;
  top: 20px;
  transition: ${({ theme }) => theme.transition.default};
  width: 25px;
  z-index: 1;
  &:focus {
    outline: none;
  }
`;

interface DeleteButtonI {
  id: string;
}

const DeleteButton = ({
  id,
}: DeleteButtonI) => {
  const handleClick = () => { console.log(id); };

  return (
    <Container>
      <AiOutlineDelete
        color={themeColor.colors.secondary}
        onClick={handleClick}
        size={20}
      />
    </Container>
  );
};

export default DeleteButton;
