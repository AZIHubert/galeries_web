import styled from 'styled-components';

interface TitleContainerI {
  danger?: boolean;
}

const TitleContainer = styled.div<TitleContainerI>`
  border-bottom: ${({
    danger,
    theme,
  }) => (
    `2px solid ${danger ? theme.colors.danger : theme.colors.primary}`
  )};
  margin-bottom: 35px;
`;

TitleContainer.defaultProps = {
  danger: false,
};

export default TitleContainer;
