import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import * as SplashScreen from 'expo-splash-screen';

import { useKeepAwake } from 'expo-keep-awake';
import AppNavigator from './src/navigation'
import { Provider as StoreProvider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/redux/store'
import useDatabase from './src/hooks/useDatabase'
// import useDataRefreash from './src/hooks/useDataRefreash'
import {UsersContextProvider} from './src/context/UsersContext'

export default function App() {
  useKeepAwake();
  SplashScreen.preventAutoHideAsync();

  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
      SplashScreen.hideAsync();
      return (
        <StoreProvider store={store}>
          <PaperProvider>
            <SafeAreaProvider>
              <UsersContextProvider>
                <AppNavigator />
              </UsersContextProvider>
            </SafeAreaProvider>
          </PaperProvider>
        </StoreProvider>
      )
  } else {
    return null;
  }
}
