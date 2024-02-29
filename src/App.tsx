import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import {UserContextProvider} from './features/context';

import Navigation from './navigation/index.navigation';

import {styles} from './Styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
  );
}

export default App;
