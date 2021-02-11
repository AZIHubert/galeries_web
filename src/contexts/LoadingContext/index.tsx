import * as React from 'react';

export const LoadingContext = React.createContext<{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}>({
  setLoading: () => {},
  loading: false,
});

export const LoadingProvider: React.FC<{}> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
