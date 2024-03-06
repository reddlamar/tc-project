import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  screenNames,
  HomeScreen,
  StoreScreen,
  MapScreen,
  ProfileScreen,
  CartScreen,
} from '../../screens/index.screens';

const Tab = createBottomTabNavigator();

const getTabIcon = (
  focused: boolean,
  color: string,
  size: number,
  route: any,
) => {
  let iconName;

  if (route.name === screenNames.home) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === screenNames.profile) {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === screenNames.store) {
    iconName = focused ? 'pricetag' : 'pricetag-outline';
  } else if (route.name === screenNames.cart) {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (route.name === screenNames.map) {
    iconName = focused ? 'map' : 'map-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

const RootNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return getTabIcon(focused, color, size, route);
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={screenNames.home} component={HomeScreen} />
      <Tab.Screen name={screenNames.store} component={StoreScreen} />
      <Tab.Screen name={screenNames.map} component={MapScreen} />
      {/* <Tab.Screen name={screenNames.product} component={ProductScreen} /> */}
      <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
      <Tab.Screen name={screenNames.cart} component={CartScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
