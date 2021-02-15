import styled from 'styled-components';

const ProfileImage = styled.img`
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  border-radius: 50%;
  height: 34px;
  margin-right: 20px;
  width: 34px;
`;

export default ProfileImage;
