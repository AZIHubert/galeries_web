import styled from 'styled-components';

const Link = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 25px;
  top: 25px;
  &:focus {
    outline: none;
  }
`;

export default Link;
