import styled from 'styled-components';

interface OpacityI {
  isPutting: boolean;
}

const Opacity = styled.div.attrs<OpacityI>(() => ({
  'data-testid': 'opacity',
}))<OpacityI>`
  height: 100%;
  opacity: ${({ isPutting }) => (isPutting ? 0.5 : 1)};
  transition: ${({ theme }) => theme.transition.default};
`;

Opacity.defaultProps = {
  isPutting: false,
};

export default Opacity;
