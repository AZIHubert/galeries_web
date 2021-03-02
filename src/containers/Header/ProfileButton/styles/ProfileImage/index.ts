import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const ProfileImage = styled.div`
  border-radius: 50%;
  height: 26px;
  margin-right: 18px;
  overflow: hidden;
  width: 26px;
  @media ${mediaQueries.laptopL} {
    height: 30px;
    margin-right: 22px;
    width: 30px;
  }
`;

export default ProfileImage;
