import * as React from 'react';

const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(true);
  }, [src]);

  return sourceLoaded;
};

export default useProgressiveImage;
