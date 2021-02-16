import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const ProfileImage = styled.img`
  border: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  border-radius: 14px;
  height: 28px;
  margin-right: 22px;
  overflow: hidden;
  width: 28px;
  @media ${mediaQueries.laptopL} {
    border-radius: 16px;
    height: 32px;
    margin-right: 26px;
    width: 32px;
  }
`;

export default ProfileImage;
