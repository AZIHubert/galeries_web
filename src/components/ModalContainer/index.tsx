import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  display: flex;
  height: auto;
  position: 'absolute';
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #7483FF;
  position: absolute;
  top: 15px;
  border-radius: 20px 0;
  right: 15px;
`;
const InnerContainer = styled.div`
  z-index: 1;
  background-color: #FFFFF4;
  border-radius: 20px 0;
  border: 4px solid #7483FF;
  padding: 50px 40px 40px 40px;
`;

const ModalContainer: React.FC<{}> = ({ children }) => (
  <Container>
    <InnerContainer>
      {children}
    </InnerContainer>
    <Background />
  </Container>
);

export default ModalContainer;
