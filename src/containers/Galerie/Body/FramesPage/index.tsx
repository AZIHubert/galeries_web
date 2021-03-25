import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button`
  background-color: transparent;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  height: 40px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  width: 200px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: ${({ theme }) => `box-shadow ${theme.transition.default} ease-in-out`};
  font-weight: bold;
  &:hover {
    box-shadow: none;
  }
`;

const FramesPage = () => (
  <Container>
    <AddButton>
      add a new frame
    </AddButton>
  </Container>
);

export default FramesPage;
