import * as React from 'react';

import Image from '#components/Image';
import Text from '#components/Text';

import { GalerieContext } from '#contexts/galerieContext';

import {
  Container,
  CoverPictureButton,
  LinkContainer,
} from './styles';

interface GaleriePictureContainerI {
  frameId: string;
  galeriePicture: GaleriePictureI;
  position: number;
}

const GaleriePicture = ({
  frameId,
  galeriePicture,
  position,
}: GaleriePictureContainerI) => {
  const { galerie } = React.useContext(GalerieContext);
  return (
    <Container
      left={position}
    >
      <LinkContainer
        to={`/galerie/${galerie ? galerie.id : '1'}/frame/${frameId}/galeriesPicture/${galeriePicture.id}`}
      >
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
      </LinkContainer>
    </Container>
  );
};

export default GaleriePicture;
