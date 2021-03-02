import { useState, useEffect } from 'react';

const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(true);
  }, [src]);

  return sourceLoaded;
};

export default useProgressiveImage;
