import React, {useState, createContext} from 'react';

export const UserContext = createContext({
  user: null,
  setUser: (newUser: any): void => newUser,
  initializing: true,
  setInitializing: (initializingState: boolean): any => initializingState,
});

export const UserContextProvider = ({children}: any): any => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{user, setUser, initializing, setInitializing}}>
      {children}
    </UserContext.Provider>
  );
};
