import * as React from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

import {
  ArrowContainer,
  Container,
  GaleriePicturesContainer,
} from './styles';

import GaleriePicture from './GaleriePicture';
import CirclesContainer from './CirclesContainer';

interface CarouselI {
  galeriePictures: GaleriePictureI[];
}

const Carousel = ({
  galeriePictures,
}: CarouselI) => {
  const circles = galeriePictures.map(({ id }) => ({ id }));

  return (
    <>
      <Container>
        <GaleriePicturesContainer>
          {galeriePictures
            .sort((a, b) => (
              a.index - b.index
            )).map((galeriePicture) => (
              <GaleriePicture
                galeriePicture={galeriePicture}
                key={galeriePicture.id}
              />
            ))}
        </GaleriePicturesContainer>
        {galeriePictures.length > 1 && (
          <>
            <ArrowContainer>
              <RiArrowLeftSLine
                size={30}
              />
            </ArrowContainer>
            <ArrowContainer
              variant='right'
            >
              <RiArrowRightSLine
                size={30}
              />
            </ArrowContainer>
          </>
        )}
      </Container>
      {galeriePictures.length > 1 && (
        <CirclesContainer
          circles={circles}
        />
      )}
    </>
  );
};

export default Carousel;
