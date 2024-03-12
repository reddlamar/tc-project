import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NotificationsScreen,
  OrderHistoryScreen,
  screenNames,
} from '../../screens/index.screens';
import TabsNavigation from '../tabs/index.navigation';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Tabs" component={TabsNavigation} />
      <Drawer.Screen
        name={screenNames.notifications}
        component={NotificationsScreen}
      />
      <Drawer.Screen
        name={screenNames.orderHistory}
        component={OrderHistoryScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
