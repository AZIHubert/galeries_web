import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { profilePicturesSelector } from '#store/selectors';

import Image from '#components/Image';

const IMAGE_SIZE = 230;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0;
`;

const InnerContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: auto;
  width: ${IMAGE_SIZE * 4}px;
`;

const ImageContainer = styled.div`
  height: ${IMAGE_SIZE - 20}px;
  margin: 10px;
  width: ${IMAGE_SIZE - 20}px;
`;

const ProfilePictureContainer = () => {
  const profilePictures = useSelector(profilePicturesSelector);
  return (
    <Container>
      <InnerContainer>
        {profilePictures.map((profilePicture) => (
          <ImageContainer
            key={profilePicture.id}
          >
            <Link
              to={`/image/${profilePicture.id}`}
            >
              <Image
                original={profilePicture.cropedImage.signedUrl}
                pending={profilePicture.pendingImage.signedUrl}
              />
            </Link>
          </ImageContainer>
        ))}
      </InnerContainer>
    </Container>
  );
};

export default ProfilePictureContainer;
