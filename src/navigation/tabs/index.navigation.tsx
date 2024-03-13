import React from 'react';
//, {useEffect}
import {View} from 'react-native';
import {Button, IconButton, MD2Colors, Badge} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  screenNames,
  HomeScreen,
  StoreScreen,
  MapScreen,
  ProfileScreen,
  CartScreen,
  EmployeeHomeScreen,
  ChatScreen,
  EmployeeChatScreen,
} from '../../screens/index.screens';
import {clearCart} from '../../services/api-services/redux/slices/cart.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {userTypes} from '../../constants/user-types';
import {styles} from './styles.navigation';

const Tab = createBottomTabNavigator();

const getTabIcon = (
  focused: boolean,
  color: string,
  size: number,
  route: any,
) => {
  let iconName: string = getIconName(route.name, focused);

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

const getIconName = (routeName: string, focused: boolean) => {
  let iconName = '';

  if (routeName === screenNames.home) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === screenNames.profile) {
    iconName = focused ? 'person' : 'person-outline';
  } else if (routeName === screenNames.store) {
    iconName = focused ? 'pricetag' : 'pricetag-outline';
  } else if (routeName === screenNames.cart) {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (routeName === screenNames.map) {
    iconName = focused ? 'map' : 'map-outline';
  } else if (
    routeName === screenNames.chat ||
    routeName === screenNames.employeeChat
  ) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (routeName === screenNames.checkout) {
    iconName = 'cash';
  }

  return iconName;
};

const renderHeaderRight = (dispatch: any, user: any) => {
  if (user) {
    return (
      <IconButton
        icon="logout"
        onPress={() => dispatch({type: 'logout'})}
        size={30}
        iconColor={
          user?.userType === 'customer' ? MD2Colors.red700 : MD2Colors.blue700
        }
      />
    );
  }
};

const renderCartHeaderLeft = (dispatch: Function, user: any) => {
  return (
    <Button
      onPress={() => dispatch(clearCart())}
      textColor={
        user?.userType === userTypes.customer
          ? MD2Colors.red700
          : MD2Colors.blue700
      }>
      Clear Cart
    </Button>
  );
};

const renderStoreHeaderLeft = (navigation: any, cart: any) => {
  return (
    <View>
      <IconButton
        onPress={() => navigation.navigate(screenNames.cart)}
        icon="cart"
        iconColor={MD2Colors.red700}
        size={30}
      />
      {cart?.length > 0 && <Badge style={styles.badge}>{cart?.length}</Badge>}
    </View>
  );
};

const TabsNavigation = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: 'getUnreadNotifications',
  //     payload: {email: 'lamar1@gmail.com'},
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const {user, unreadNotifications} = useAppSelector(
    (state: any) => state.userReducer,
  );

  const renderTabGroupHeaderLeft = () => {
    return (
      <View>
        <IconButton
          icon="message"
          iconColor={MD2Colors.red700}
          onPress={() => {
            navigation.navigate(screenNames.notifications);
          }}
        />
        {unreadNotifications?.length > 0 && (
          <Badge style={styles.badge}>{unreadNotifications?.length}</Badge>
        )}
      </View>
    );
  };

  const {cart} = useAppSelector((state: any) => state.cartReducer);

  const renderTabGroup = () => {
    if (user?.userType === 'customer') {
      return (
        <Tab.Group
          screenOptions={{
            headerLeft: () => renderTabGroupHeaderLeft(),
            headerTitleStyle: {color: MD2Colors.red700},
          }}>
          <Tab.Screen name={screenNames.home} component={HomeScreen} />
          <Tab.Screen
            name={screenNames.store}
            component={StoreScreen}
            options={{
              headerLeft: () => renderStoreHeaderLeft(navigation, cart),
            }}
          />
          <Tab.Screen name={screenNames.map} component={MapScreen} />
          <Tab.Screen name={screenNames.chat} component={ChatScreen} />
          <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
          <Tab.Screen
            name={screenNames.cart}
            component={CartScreen}
            options={{
              headerLeft: () => renderCartHeaderLeft(dispatch, user),
            }}
          />
        </Tab.Group>
      );
    }

    return (
      <Tab.Group
        screenOptions={{
          headerTitleStyle: {color: MD2Colors.blue700},
        }}>
        <Tab.Screen name={screenNames.home} component={EmployeeHomeScreen} />
        <Tab.Screen name={screenNames.map} component={MapScreen} />
        <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
        <Tab.Screen
          name={screenNames.employeeChat}
          component={EmployeeChatScreen}
        />
      </Tab.Group>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return getTabIcon(focused, color, size, route);
        },
        tabBarActiveTintColor:
          user?.userType === userTypes.customer
            ? MD2Colors.red700
            : MD2Colors.blue700,
        tabBarInactiveTintColor: 'gray',
        headerRight: () => {
          return renderHeaderRight(dispatch, user);
        },
      })}>
      {renderTabGroup()}
    </Tab.Navigator>
  );
};

export default TabsNavigation;
