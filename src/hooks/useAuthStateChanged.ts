import {useEffect, useContext} from 'react';
import {UserContext} from '../features/context';

import {onAuthStateModified} from '../services/api-services/firebase/auth.service';

export const useAuthStateChanged = () => {
  const {setUser, setInitializing, initializing} = useContext(UserContext);

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(user: any) {
      setUser(user);

      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = onAuthStateModified(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [initializing, setUser, setInitializing]);
};
