import * as React from 'react';

import {
  Circle,
  Container,
} from './styles';

interface CarouselCirclesContainerI {
  circles: {
    id: string;
  }[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselCirclesContainer = ({
  circles,
  currentSlide,
  setCurrentSlide,
}: CarouselCirclesContainerI) => (
  <Container>
    {circles.map((circle, index) => (
      <Circle
        key={circle.id}
        current={currentSlide === index}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </Container>
);

export default CarouselCirclesContainer;
