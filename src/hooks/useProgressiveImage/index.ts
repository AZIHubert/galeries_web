import * as React from 'react';

const useProgressiveImage = (
  src: string,
  ref: React.MutableRefObject<HTMLElement | null>,
  once = false,
) => {
  const [isIntersecting, setIntersecting] = React.useState<boolean>(false);
  const [sourceLoaded, setSourceLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { current } = ref;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        console.log(entry);
        setIntersecting(entry.isIntersecting);
        if (once) {
          if (entry.isIntersecting && current) {
            obs.unobserve(current);
          }
        }
      },
    );
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [once, ref]);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(true);
  }, [src, isIntersecting]);

  return sourceLoaded && isIntersecting;
};

export default useProgressiveImage;
