import styled from 'styled-components';

interface PartI {
  bottom?: boolean;
  alignment?: 'left' | 'right' | 'center';
}

const Part = styled.div<PartI>`
  align-items: ${({ alignment }) => {
    switch (alignment) {
      case 'center':
        return 'center';
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ bottom }) => (bottom ? '10px' : 0)};
  padding-bottom: ${({ bottom }) => (bottom ? '10px' : 0)};
`;

Part.defaultProps = {
  bottom: false,
  alignment: 'left',
};

export default Part;
