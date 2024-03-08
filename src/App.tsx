import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import {UserContextProvider} from './features/context';

import Navigation from './navigation/index.navigation';

import {store, persistor} from './services/api-services/redux/store';

import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';

import 'react-native-gesture-handler';

import {styles} from './Styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        onBeforeLift={() => {
          console.log('store is loaded');
        }}>
        <PaperProvider>
          <NavigationContainer>
            <UserContextProvider>
              <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />
                <Navigation />
              </SafeAreaView>
            </UserContextProvider>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
