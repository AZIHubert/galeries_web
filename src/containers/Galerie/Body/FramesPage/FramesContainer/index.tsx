import * as React from 'react';
import {
  AiOutlineDelete,
  AiOutlineHeart,
} from 'react-icons/ai';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import Image from '#components/Image';
import Text from '#components/Text';

import themeColor from '#helpers/theme';

import {
  selectProfilPicture,
} from '#store/helpers';

import {
  userSelector,
} from '#store/selectors';

import { GalerieContext } from '#contexts/galerieContext';

interface FramesContainerI {
  frames: { [name: string]: FrameI }
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  width: 440px;
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  margin-bottom: 40px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 15px;
  overflow: hidden;
`;

const InformationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 26px;
  margin-right: 10px;
  width: 26px;
`;

const FooterContainer = styled.div`
  padding: 10px 15px;
  border-top: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const GaleriePicture = styled.li`
  position: relative;
  top: 0;
  left: 0;
`;

const CoverPictureButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const GalerePicturesContainer = styled.ul`
  position: relative;
`;

const CarouselCircle = styled.div`
  height: 6px;
  width: 6px;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.black};
  margin: 0 3px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const CarousselCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftArrow = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
`;

const RightArrow = styled.div`
  position: absolute;
  right: 0;
  opacity: 0.5;
  top: 50%;
  transform: translateY(-50%);
`;

const FramesContainer = ({
  frames,
}: FramesContainerI) => {
  const { galerie } = React.useContext(GalerieContext);
  const user = useSelector(userSelector);

  return (
    <div>
      {Object.keys(frames).sort(
        (a, b) => (
          new Date(frames[b].createdAt).getTime()
        - new Date(frames[a].createdAt).getTime()
        ),
      ).map((index) => (
        <Container
          key={frames[index].id}
        >
          <InformationContainer>
            <UserContainer>
              <ProfileImage>
                <Image
                  alt={`${frames[index].user.userName}'s profile picture`}
                  original={selectProfilPicture(frames[index].user).croped}
                  pending={selectProfilPicture(frames[index].user).pending}
                />
              </ProfileImage>
              <Text
                fontWeight='bold'
                styles={{
                  fontSize: 0.8,
                }}
              >
                {frames[index].user.userName}
              </Text>
            </UserContainer>
            {user && frames[index].user.id === user.id && (
              <AiOutlineDelete
                color={themeColor.colors.danger}
                size={15}
              />
            )}
          </InformationContainer>
          <GalerePicturesContainer>
            {frames[index]
              .galeriePictures
              .sort(
                (a, b) => (
                  a.index - b.index
                ),
              ).map((galeriePicture) => (
                <GaleriePicture>
                  <Image
                    alt={`image ${galeriePicture.index}`}
                    key={galeriePicture.id}
                    original={galeriePicture.cropedImage.signedUrl}
                    pending={galeriePicture.pendingImage.signedUrl}
                  />
                  <CoverPictureButton>
                    <Text
                      styles={{
                        fontSize: 0.9,
                      }}
                    >
                      {galerie && galerie.coverPictureId === galeriePicture.id ? 'remove picture id' : 'use as cover picture'}
                    </Text>
                  </CoverPictureButton>

                </GaleriePicture>
              ))}
            {frames[index].galeriePictures.length > 1 && (
              <>
                <LeftArrow>
                  <RiArrowLeftSLine
                    size={30}
                  />
                </LeftArrow>
                <RightArrow>
                  <RiArrowRightSLine
                    size={30}
                  />
                </RightArrow>
              </>
            )}
          </GalerePicturesContainer>
          <FooterContainer>
            {frames[index].galeriePictures.length > 1 && (
              <CarousselCirclesContainer>
                {frames[index].galeriePictures.map((galeriePicture) => (
                  <CarouselCircle
                    key={galeriePicture.id}
                  />
                ))}
              </CarousselCirclesContainer>
            )}
            <LikeContainer>
              <Text
                fontWeight='bold'
              >
                {frames[index].likes.length} like{frames[index].likes.length > 1}
              </Text>
              <AiOutlineHeart
                color={themeColor.colors.danger}
                size={25}
              />
            </LikeContainer>
            <Text
              fontWeight='lighter'
              styles={{
                fontSize: 0.55,
                textAlign: 'center',
              }}
            >
              {moment(frames[index].createdAt).calendar()}
            </Text>
          </FooterContainer>
        </Container>
      ))}
    </div>
  );
};

export default FramesContainer;
