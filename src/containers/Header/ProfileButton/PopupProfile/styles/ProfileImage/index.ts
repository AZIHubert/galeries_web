import styled from 'styled-components';

const ProfileImage = styled.img`
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  border-radius: 50px;
  height: 40px;
  margin-right: 35px;
  overflow: hidden;
  width: 40px;
`;

export default ProfileImage;
