import * as React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
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

import themeColor from '#helpers/theme';

import { fetchProfilePicture } from '#store/actions';
import {
  galeriesSelector,
  profilePictureStatusSelector,
  profilePicturesSelector,
} from '#store/selectors';

import {
  Background,
  Container,
  Link,
} from './styles';

const paddingVertical = 60;
const paddingHorizontal = 100;

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
        const innerWidthWithPadding = window.innerWidth - paddingHorizontal * 2;
        const innerHeightWidthPadding = window.innerHeight - paddingVertical * 2;
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
      <Container
        styles={{
          paddingHorizontal,
          paddingVertical,
        }}
      >
        <Link
          onClick={() => {
            history.goBack();
          }}
        >
          <BsArrowRightShort
            color={themeColor.colors.black}
            size={30}
          />
        </Link>
        <Image
          alt='image'
          mode={mode}
          original={image.originalImage.signedUrl}
          pending={image.pendingImage.signedUrl}
        />
        <Background
          uri={image.originalImage.signedUrl}
        />
      </Container>
    )
  );
};

export default FullPageImage;
