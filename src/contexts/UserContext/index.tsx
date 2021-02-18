import * as React from 'react';

export const UserContext = React.createContext<{
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  user: null | UserI;
}>({
  setUser: () => {},
  user: null,
});

export const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = React.useState<null | UserI>(null);
  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
