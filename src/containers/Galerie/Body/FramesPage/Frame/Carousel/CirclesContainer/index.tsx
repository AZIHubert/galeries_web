import * as React from 'react';

import {
  Circle,
  Container,
} from './styles';

interface CarouselCirclesContainerI {
  circles: {
    id: string;
  }[]
}

const CarouselCirclesContainer = ({
  circles,
}: CarouselCirclesContainerI) => (
  <Container>
    {circles.map((circle) => (
      <Circle
        key={circle.id}
      />
    ))}
  </Container>
);

export default CarouselCirclesContainer;
