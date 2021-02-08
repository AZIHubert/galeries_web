import styled from 'styled-components';

interface ContainerI {
  marginBottom: number;
  marginTop: number;
}

const Container = styled.p<ContainerI>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-style: italic;
  margin: ${({ marginBottom, marginTop }) => (
    `${marginBottom}px 0 ${marginTop}px 0`
  )};
  overflow: hidden;
  text-align: center;
  &::before {
    margin-left: -50%;
    right: 1.3em;
  }
  &::after {
    left: 1.3em;
    margin-right: -50%;
  }
  &::before, &::after {
    background-color: ${({ theme }) => theme.colors.primary};
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }
`;

Container.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
};

export default Container;
