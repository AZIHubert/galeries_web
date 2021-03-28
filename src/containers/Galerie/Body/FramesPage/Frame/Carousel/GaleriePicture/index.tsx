import * as React from 'react';

import Image from '#components/Image';
import Text from '#components/Text';

import { GalerieContext } from '#contexts/galerieContext';

import {
  Container,
  CoverPictureButton,
} from './styles';

interface GaleriePictureContainerI {
  galeriePicture: GaleriePictureI;
}

const GaleriePicture = ({
  galeriePicture,
}: GaleriePictureContainerI) => {
  const { galerie } = React.useContext(GalerieContext);
  return (
    <Container>
      <Image
        alt={`image ${galeriePicture.index}`}
        key={galeriePicture.id}
        original={galeriePicture.cropedImage.signedUrl}
        pending={galeriePicture.pendingImage.signedUrl}
      />
      {galerie
      && (galerie.role === 'admin' || galerie.role === 'creator')
      && (
        <CoverPictureButton>
          <Text
            styles={{
              fontSize: 0.9,
            }}
          >
            {galerie && galerie.coverPictureId === galeriePicture.id ? 'remove picture id' : 'use as cover picture'}
          </Text>
        </CoverPictureButton>
      )}
    </Container>
  );
};

export default GaleriePicture;
