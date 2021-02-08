import styled from 'styled-components';

type jJustifyContent = 'center' | 'end' | 'flex-end' | 'flex-start' | 'normal' | 'right' | 'safe' | 'space-around' | 'space-evenly' | 'start' | 'stretch' | 'unsafe';

interface SwitchContainerI {
  fontSize?: number;
  justifyContent?: jJustifyContent;
  marginBottom?: number;
  marginTop?: number;
}

const SwitchContainer = styled.div<SwitchContainerI>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  font-size: ${({ fontSize }) => (`${fontSize}rem`)};
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px`
  )};
`;

SwitchContainer.defaultProps = {
  fontSize: 1,
  justifyContent: 'flex-start',
  marginBottom: 0,
  marginTop: 0,
};

export default SwitchContainer;
