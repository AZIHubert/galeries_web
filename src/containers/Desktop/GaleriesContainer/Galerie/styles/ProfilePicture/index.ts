import styled from 'styled-components';

const ProfilePicture = styled.div`
  height: 22px;
  width: 22px;
  border: ${({ theme }) => (
    `2px solid ${theme.colors.white}`
  )};
  border-radius: 50%;
  overflow: hidden;
  margin-right: -6px;
`;

export default ProfilePicture;
