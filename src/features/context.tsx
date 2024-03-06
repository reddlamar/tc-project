import React, {useState, createContext} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type User = {
  user: FirebaseAuthTypes.User | null;
  setUser: Function;
  initializing: boolean;
  setInitializing: Function;
};

export const UserContext = createContext<User | null>({
  user: null,
  setUser: (newUser: any): void => newUser,
  initializing: true,
  setInitializing: (initializingState: boolean): any => initializingState,
});

export const UserContextProvider = ({children}: any): any => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{user, setUser, initializing, setInitializing}}>
      {children}
    </UserContext.Provider>
  );
};
