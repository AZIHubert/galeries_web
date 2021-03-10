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
  profilePictureStatusSelector,
  profilePicturesSelector,
} from '#store/selectors';

import {
  Background,
  Container,
  InnerContainer,
  Link,
} from './styles';

const paddingVertical = 60;
const paddingHorizontal = 100;

const FullPageImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const profilePictures = useSelector(profilePicturesSelector);
  const status = useSelector(profilePictureStatusSelector);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<ProfilePictureI | null>(null);
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
          setImage(profilePictures[id]);
        } else {
          setHasFetch(true);
          dispatch(fetchProfilePicture({ id }));
        }
      }
    }
  }, [
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
        <InnerContainer
          isCover={mode === 'cover' || mode === 'width'}
        >
          <Image
            alt='image'
            mode={mode}
            original={image.originalImage.signedUrl}
            pending={image.pendingImage.signedUrl}
          />
        </InnerContainer>
        <Background
          uri={image.originalImage.signedUrl}
        />
      </Container>
    )
  );
};

export default FullPageImage;
