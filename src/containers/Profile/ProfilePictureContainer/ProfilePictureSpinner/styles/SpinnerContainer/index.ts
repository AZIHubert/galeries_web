import styled from 'styled-components';

const SpinnerContainer = styled.div`
  height: 60px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: ${({ theme }) => theme.transition.slow};
  width: 60px;
`;

export default SpinnerContainer;
