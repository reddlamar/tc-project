import React from 'react';
import {IconButton, MD2Colors} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  screenNames,
  HomeScreen,
  StoreScreen,
  MapScreen,
  ProfileScreen,
  CartScreen,
  EmployeeHomeScreen,
  GroupChatScreen,
  // CheckoutScreen,
} from '../../screens/index.screens';

import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';

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
  } else if (routeName === screenNames.groupChat) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (routeName === screenNames.checkout) {
    iconName = 'cash';
  }

  return iconName;
};

const renderHeaderRight = (dispatch: any) => (
  <IconButton
    icon="logout"
    onPress={() => dispatch({type: 'logout'})}
    size={24}
    iconColor={MD2Colors.red700}
  />
);

const RootNavigation = () => {
  const dispatch = useAppDispatch();

  const {user} = useAppSelector((state: any) => state.userReducer);

  const renderTabGroup = () => {
    if (user.userType === 'customer') {
      return (
        <Tab.Group>
          <Tab.Screen name={screenNames.home} component={HomeScreen} />
          <Tab.Screen name={screenNames.store} component={StoreScreen} />
          <Tab.Screen name={screenNames.map} component={MapScreen} />
          <Tab.Screen
            name={screenNames.groupChat}
            component={GroupChatScreen}
          />
          <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
          <Tab.Screen name={screenNames.cart} component={CartScreen} />
          {/* <Tab.Screen name={screenNames.checkout} component={CheckoutScreen} /> */}
        </Tab.Group>
      );
    }

    return (
      <Tab.Group>
        <Tab.Screen name={screenNames.home} component={EmployeeHomeScreen} />
        <Tab.Screen name={screenNames.map} component={MapScreen} />
        <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
        <Tab.Screen name={screenNames.groupChat} component={GroupChatScreen} />
      </Tab.Group>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return getTabIcon(focused, color, size, route);
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => {
          return renderHeaderRight(dispatch);
        },
      })}>
      {renderTabGroup()}
    </Tab.Navigator>
  );
};

export default RootNavigation;
