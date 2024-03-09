import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, MD2Colors, Text, IconButton} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import TabsNavigation from './tabs/index.navigation';

import {
  SignInScreen,
  SignUpScreen,
  ProductScreen,
  screenNames,
  OrderHistoryScreen,
  OrderDetailsScreen,
  CheckoutScreen,
} from '../screens/index.screens';

import {
  useAppSelector,
  useAppDispatch,
} from '../services/api-services/redux/hooks';

import LoadingIndicator from '../components/loading-indicator/index.component';

import {UserContext} from '../features/context';

import {useAuthStateChanged} from '../hooks/useAuthStateChanged';

import {styles} from './styles.navigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {initializing} = useContext<any>(UserContext);
  const [userType, setUserType] = useState<string>('employee');
  const user = useAppSelector((state: any) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<any>();

  useAuthStateChanged();

  const renderSignOutButton = () => (
    <IconButton
      icon="logout"
      onPress={() => dispatch({type: 'logout'})}
      size={30}
      iconColor={
        user.userType === 'customer' ? MD2Colors.red700 : MD2Colors.blue700
      }
      style={styles.logoutButton}
    />
  );

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
    if (user) {
      return renderSignOutButton();
    }

    if (!user) {
      return renderSignUpButtons();
    }
  };

  const renderStackGroup = () => {
    if (user?.userType === 'customer') {
      return (
        <Stack.Group
          screenOptions={{
            headerBackTitle: 'Back',
            headerBackTitleStyle: {fontSize: 21},
            headerTintColor: MD2Colors.red700,
            headerTitleStyle: {color: MD2Colors.red700, fontSize: 21},
          }}>
          <Stack.Screen
            name="Tabs"
            component={TabsNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen name={screenNames.product} component={ProductScreen} />
          <Stack.Screen
            name={screenNames.orderHistory}
            component={OrderHistoryScreen}
          />
          <Stack.Screen
            name={screenNames.checkout}
            component={CheckoutScreen}
          />
        </Stack.Group>
      );
    }

    if (user?.userType === 'employee') {
      return (
        <Stack.Group screenOptions={{headerBackTitle: 'Back'}}>
          <Stack.Screen
            name="Root"
            component={TabsNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen name={'Order Details'} component={OrderDetailsScreen} />
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
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => renderHeaderRight(),
        }}>
        {renderStackGroup()}
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
