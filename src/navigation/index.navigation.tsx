import React, {useContext, useState, useEffect} from 'react';
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
  NotificationsScreen,
  DeliveriesScreen,
  ChatScreen,
} from '../screens/index.screens';
import {
  useAppSelector,
  useAppDispatch,
} from '../services/api-services/redux/hooks';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LoadingIndicator from '../components/loading-indicator/index.component';
import {UserContext} from '../features/context';
import {useAuthStateChanged} from '../hooks/useAuthStateChanged';
import {styles} from './styles.navigation';
import {userTypes} from '../constants/user-types';
import {orderStatuses} from '../constants/order-statuses';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {initializing} = useContext<any>(UserContext);
  const [userType, setUserType] = useState<string>('employee');
  const user = useAppSelector((state: any) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<any>();

  useAuthStateChanged();

  useEffect(() => {
    let subscriber: any;

    if (user && user?.userType === userTypes.customer) {
      subscriber = firestore()
        .collection('reddlamar1@gmail.com-Notifications')
        .where('read', '==', false)
        .onSnapshot(documentSnapshot => {
          console.log(
            'Unread Notifications',
            documentSnapshot.docs.map(d => d.data()),
          );
          dispatch({
            type: 'getUnreadNotificationsDocumentSnapshot',
            payload: documentSnapshot.docs.map(d => d.data()),
          });
        });
    }

    // Stop listening for updates when no longer required
    return () => {
      if (subscriber) {
        subscriber();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let subscriber: any;
    if (user) {
      subscriber = firestore()
        .collection('Chat')
        .where(
          firebase.firestore.FieldPath.documentId(),
          '==',
          'reddlamar1@gmail.com',
        )
        .onSnapshot(documentSnapshot => {
          console.log(
            'Chat',
            documentSnapshot.docs.map(d => d.data()),
          );
          dispatch({
            type: 'getMessages',
            payload: {email: 'reddlamar1@gmail.com'},
          });
        });
    }

    // Stop listening for updates when no longer required
    return () => {
      if (subscriber) {
        subscriber();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let subscriber: any;
    if (user) {
      subscriber = firestore()
        .collection('Orders')
        .where('status', '==', orderStatuses.inProgress)
        .onSnapshot(documentSnapshot => {
          console.log(
            'Orders',
            documentSnapshot.docs.map(d => d.data()),
          );
          dispatch({
            type: 'getInProgressOrders',
            payload: {status: orderStatuses.inProgress},
          });
        });
    }

    // Stop listening for updates when no longer required
    return () => {
      if (subscriber) {
        subscriber();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          <Stack.Screen
            name={screenNames.notifications}
            component={NotificationsScreen}
          />
        </Stack.Group>
      );
    }

    if (user?.userType === 'employee') {
      return (
        <Stack.Group
          screenOptions={{
            headerBackTitle: 'Back',
            headerBackTitleStyle: {fontSize: 21},
            headerTintColor: MD2Colors.blue700,
            headerTitleStyle: {color: MD2Colors.blue700, fontSize: 21},
          }}>
          <Stack.Screen
            name="Tabs"
            component={TabsNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screenNames.orderDetails}
            component={OrderDetailsScreen}
          />
          <Stack.Screen
            name={screenNames.deliveries}
            component={DeliveriesScreen}
          />
          <Stack.Screen name={screenNames.chat} component={ChatScreen} />
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
