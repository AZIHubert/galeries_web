import * as React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import styled from 'styled-components';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';

import Image from '#components/Image';
import Button from '#components/Button';

import themeColor from '#helpers/theme';

import {
  Background,
  Link,
} from './styles';

import { fetchProfilePicture } from '#store/actions';
import {
  galeriesSelector,
  profilePictureStatusSelector,
  profilePicturesSelector,
} from '#store/selectors';

const paddingVertical = 60;
const paddingHorizontal = 0;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Information = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-left: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px 20px;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 80%;
  padding: ${paddingVertical}px ${paddingVertical}px;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const FullPageImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {
    frameId,
    galerieId,
    id,
  } = useParams<{
    frameId: string;
    galerieId: string,
    id: string,
  }>();
  const galeries = useSelector(galeriesSelector);
  const profilePictures = useSelector(profilePicturesSelector);
  const status = useSelector(profilePictureStatusSelector);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<ProfilePictureI | GaleriePictureI |null>(null);
  const [mode, setMode] = React.useState<'width' | 'height' | 'cover'>('cover');

  React.useEffect(() => {
    const handleMode = () => {
      if (image) {
        const {
          height,
          width,
        } = image.originalImage;
        const innerWidthWithPadding = window.innerWidth * 0.7 - paddingHorizontal * 2;
        const innerHeightWidthPadding = window.innerHeight * 0.7 - paddingVertical * 2;
        const maxWidth = (height * innerWidthWithPadding) / width;
        if (
          height < innerHeightWidthPadding
          && width < innerWidthWithPadding
        ) {
          setMode('cover');
        } else if (innerHeightWidthPadding > maxWidth) {
          setMode('width');
        } else {
          setMode('height');
        }
      }
    };
    handleMode();
    window.addEventListener('resize', handleMode);
    return () => window.removeEventListener('resize', handleMode);
  }, [image]);

  React.useEffect(() => {
    if (id) {
      if (location.pathname.includes('profilePicture')) {
        const currentImage = profilePictures[id];
        if (currentImage) {
          setImage(currentImage);
        } else {
          setHasFetch(true);
          dispatch(fetchProfilePicture({ id }));
        }
      }
      if (galerieId && frameId) {
        if (location.pathname.includes('galerie')) {
          const galerie = galeries[galerieId];
          if (!galerie) {
            history.push(`/galerie/${galerieId}`);
          } else {
            const frame = galerie.frames.frames[frameId];
            if (!frame) {
              history.push(`/galerie/${galerieId}`);
            } else {
              const currentImage = frame
                .galeriePictures
                .filter((galeriePicture) => galeriePicture.id === id)[0];
              if (currentImage) {
                setImage(currentImage);
              } else {
                history.push(`/galerie/${galerieId}`);
              }
            }
          }
        }
      }
    }
  }, [
    galerieId,
    id,
    location,
  ]);

  React.useEffect(() => {
    if (hasFetch && id) {
      if (status === 'success') {
        setImage(profilePictures[id]);
      }
      if (status === 'error' && location.pathname.includes('profilePicture')) {
        history.push('/profile');
      }
    }
  }, [
    hasFetch,
    id,
    location,
    status,
  ]);

  return (
    image && (
      <Container>
        <ImageContainer>
          <Image
            alt='image'
            mode={mode}
            original={image.originalImage.signedUrl}
            pending={image.pendingImage.signedUrl}
          />
        </ImageContainer>
        <Information>
          <Link
            onClick={() => {
              history.goBack();
            }}
          >
            <BsArrowRightShort
              color={themeColor.colors.primary}
              size={30}
            />
          </Link>
          <ButtonContainer>
            <Button.Gradiant
              disabled={false}
              title='use as profile picture'
              type='button'
              styles={{
                marginBottom: 20,
              }}
            />
            <Button.Default
              title='delete profile picture'
              danger
              variant='secondary'
              styles={{
                marginBottom: 20,
              }}
            />
          </ButtonContainer>
        </Information>
        <Background
          uri={image.originalImage.signedUrl}
        />
      </Container>
    )
  );
};

export default FullPageImage;
