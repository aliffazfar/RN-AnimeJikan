import {useEffect, useState} from 'react';

export const useInitialRootStore = (callback: () => void | Promise<void>) => {
  const [rehydrated, setRehydrated] = useState<boolean>(false);

  // Kick off initial async loading actions, like loading fonts and rehydrating RootStore
  useEffect(() => {
    (async () => {
      // let the app know we've finished rehydrating
      setRehydrated(true);

      // invoke the callback, if provided
      if (callback) await callback();
    })();
  }, []);

  return {rehydrated};
};
