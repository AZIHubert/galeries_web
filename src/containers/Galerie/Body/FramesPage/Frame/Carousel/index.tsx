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
  frameId: string;
  galeriePictures: GaleriePictureI[];
}

const Carousel = ({
  frameId,
  galeriePictures,
}: CarouselI) => {
  const circles = galeriePictures.map(({ id }) => ({ id }));
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(436);

  React.useEffect(() => {
    const handleSize = () => setSize(436);
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <>
      <Container>
        <GaleriePicturesContainer
          position={size * currentSlide}
        >
          {galeriePictures
            .sort((a, b) => (
              a.index - b.index
            )).map((galeriePicture, index) => (
              <GaleriePicture
                galeriePicture={galeriePicture}
                key={galeriePicture.id}
                position={size * index}
                frameId={frameId}
              />
            ))}
        </GaleriePicturesContainer>
        {galeriePictures.length > 1 && (
          <>
            {currentSlide !== 0 && (
              <ArrowContainer
                onClick={() => {
                  if (currentSlide !== 0) {
                    setCurrentSlide((prevState) => prevState - 1);
                  }
                }}
              >
                <RiArrowLeftSLine
                  size={18}
                />
              </ArrowContainer>
            )}
            {(currentSlide < galeriePictures.length - 1) && (
              <ArrowContainer
                variant='right'
              >
                <RiArrowRightSLine
                  size={18}
                  onClick={() => {
                    if (currentSlide < galeriePictures.length - 1) {
                      setCurrentSlide((prevState) => prevState + 1);
                    }
                  }}
                />
              </ArrowContainer>
            )}
          </>
        )}
      </Container>
      {galeriePictures.length > 1 && (
        <CirclesContainer
          circles={circles}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      )}
    </>
  );
};

export default Carousel;
