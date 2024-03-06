import {useEffect, useContext} from 'react';
import {UserContext} from '../features/context';

import {onAuthStateModified} from '../services/api-services/firebase/auth.service';

export const useAuthStateChanged = () => {
  const {setUser, setInitializing, initializing} = useContext<any>(UserContext);

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(userData: any) {
      setUser(userData);

      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = onAuthStateModified(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [initializing, setUser, setInitializing]);
};
