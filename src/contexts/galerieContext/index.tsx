import * as React from 'react';

export const GalerieContext = React.createContext<{
  galerie: GalerieI | null;
  removeGalerie:() => void;
  setGalerie: React.Dispatch<React.SetStateAction<GalerieI | null>>;
}>({
      galerie: null,
      removeGalerie: () => {},
      setGalerie: () => {},
    });

export const GalerieProvider: React.FC<{}> = ({ children }) => {
  const [galerie, setGalerie] = React.useState<GalerieI | null>(null);

  const removeGalerie = () => setGalerie(null);

  return (
    <GalerieContext.Provider
      value={{
        galerie,
        removeGalerie,
        setGalerie,
      }}
    >
      {children}
    </GalerieContext.Provider>
  );
};
