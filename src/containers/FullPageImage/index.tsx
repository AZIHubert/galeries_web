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
          mode='contain'
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
