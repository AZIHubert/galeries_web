import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { UpArrow } from '#ressources/svgComponents';

import {
  Button,
  Fader,
} from './styles';

const ScrollToTop = () => {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = 'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
      const windowBottom = Math.round(window.pageYOffset);
      if (windowBottom >= windowHeight - 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollTop = () => {
    if (show) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <CSSTransition
      classNames='fade'
      in={show}
      timeout={300}
      unmountOnExit
    >
      <Fader>
        <Button
          onClick={scrollTop}
        >
          <UpArrow />
        </Button>
      </Fader>
    </CSSTransition>

  );
};

export default ScrollToTop;
