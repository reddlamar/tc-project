import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, MD2Colors, Text} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import RootNavigation from './root/index.naviation';

import {
  SignInScreen,
  SignUpScreen,
  ProductScreen,
  screenNames,
} from '../screens/index.screens';

import {useSelector} from 'react-redux';

import LoadingIndicator from '../components/loading-indicator/index.component';

import {UserContext} from '../features/context';

import {useAuthStateChanged} from '../hooks/useAuthStateChanged';

import {signOut} from '../services/api-services/firebase/auth.service';

import {styles} from './styles.navigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {initializing} = useContext<any>(UserContext);
  const [userType, setUserType] = useState<string>('employee');
  const userData = useSelector((state: any) => state.userReducer.user);
  console.log('User Data:', userData);

  const navigation = useNavigation<any>();
  // // const route = useRoute();

  useAuthStateChanged();

  const renderSignOutButton = () => {
    return (
      <Button onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Button>
    );
  };

  const renderSignUpButtons = () => {
    return (
      <View>
        {userType === 'employee' ? (
          <Button
            onPress={() => {
              setUserType('customer');
              navigation.navigate(screenNames.signUp, {signUpType: userType});
            }}>
            <Text style={styles.signUpButton}>Employee Sign Up</Text>
          </Button>
        ) : (
          <Button
            onPress={() => {
              setUserType('employee');
              navigation.navigate(screenNames.signUp, {signUpType: userType});
            }}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </Button>
        )}
      </View>
    );
  };

  const renderBackButton = () => {
    if (navigation.canGoBack()) {
      return (
        <Button
          onPress={() => {
            setUserType('employee');
            navigation.goBack();
          }}
          icon="less-than">
          <Text style={styles.signUpButton}>Back</Text>
        </Button>
      );
    }
  };

  const renderHeaderRight = () => {
    if (userData) {
      return renderSignOutButton();
    }
    return renderSignUpButtons();
  };

  const renderStackGroup = () => {
    if (userData) {
      return (
        <Stack.Group>
          <Stack.Screen
            name="Root"
            component={RootNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen name={screenNames.product} component={ProductScreen} />
        </Stack.Group>
      );
    }

    return (
      <Stack.Group screenOptions={{headerLeft: () => renderBackButton()}}>
        <Stack.Screen name={screenNames.signIn} component={SignInScreen} />
        <Stack.Screen name={screenNames.signUp} component={SignUpScreen} />
      </Stack.Group>
    );
  };

  if (initializing) {
    return <LoadingIndicator text="Initializing" color={MD2Colors.blue400} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => renderHeaderRight(),
      }}>
      {renderStackGroup()}
    </Stack.Navigator>
  );
};

export default Navigation;
