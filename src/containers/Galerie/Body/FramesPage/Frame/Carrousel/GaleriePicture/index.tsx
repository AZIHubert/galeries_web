import * as React from 'react';

import Image from '#components/Image';

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
          mode='fill'
          original={galeriePicture.cropedImage.signedUrl}
          pending={galeriePicture.pendingImage.signedUrl}
        />
      </LinkContainer>
      {
        galerie
        && (galerie.role === 'admin' || galerie.role === 'creator')
        && (
          <CoverPictureButton>
            {
              galerie
              && galerie.coverPictureId === galeriePicture.id ? (
                  'remove picture id'
                ) : (
                  'use as cover picture'
                )
            }
          </CoverPictureButton>
        )
      }
    </Container>
  );
};

export default GaleriePicture;
