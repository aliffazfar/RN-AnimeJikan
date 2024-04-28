import 'react-native-gesture-handler';
import 'react-native-devsettings';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {useInitialRootStore} from '@hooks/useInitialRootStore';
import {AppNavigator} from '@navigators/AppNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from '@redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

const queryClient = new QueryClient();

const App = (props: AppProps) => {
  const {hideSplashScreen} = props;

  const {rehydrated} = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
    // If the initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    setTimeout(hideSplashScreen, 500);
  });

  // Wait for our state to be ready.
  if (!rehydrated) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};
export default App;
