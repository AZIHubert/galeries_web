import * as React from 'react';

const ScrollBottom = (padding = 0) => {
  const [bottomReach, setBottomReach] = React.useState<boolean>(false);
  const [checkOnlyOnce, setCheckOnlyOnce] = React.useState<boolean>(false);

  const handleScroll = () => {
    setCheckOnlyOnce(false);
    const windowHeight = 'innerHeight' in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = Math.round(windowHeight + window.pageYOffset + padding);
    if (!checkOnlyOnce) {
      if (windowBottom >= docHeight) {
        setBottomReach(true);
      } else {
        setBottomReach(false);
      }
    }
  };
  React.useEffect(() => {
    if (bottomReach) {
      setBottomReach(false);
      setCheckOnlyOnce(true);
    }
  }, [bottomReach]);
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return bottomReach;
};

export default ScrollBottom;
