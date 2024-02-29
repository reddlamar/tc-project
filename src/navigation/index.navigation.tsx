import React, {useContext} from 'react';
import {Button, MD2Colors, Text} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  MapScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens/index.screens';
import LoadingIndicator from '../components/loading-indicator/index.component';

import {UserContext} from '../features/context';

import {useAuthStateChanged} from '../hooks/useAuthStateChanged';

import {signOut} from '../services/api-services/firebase/auth.service';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, initializing} = useContext(UserContext);
  useAuthStateChanged();

  const renderSignOutButton = () => {
    if (user) {
      return (
        <Button onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Button>
      );
    }
  };

  const renderStackGroup = () => {
    if (user) {
      return (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Group>
      );
    }

    return (
      <Stack.Group>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Group>
    );
  };

  if (initializing) {
    return <LoadingIndicator text="Initializing" color={MD2Colors.blue400} />;
  }

  return (
    <Stack.Navigator screenOptions={{headerRight: () => renderSignOutButton()}}>
      {renderStackGroup()}
    </Stack.Navigator>
  );
};

export default Navigation;
