import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomTabNavigator} from './BottomTabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const Drawer = createDrawerNavigator();

function NotificationsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Test</Text>
    </View>
  );
}

const AppDrawer = function AppStack() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer {...props}>
      <AppDrawer />
    </NavigationContainer>
  );
};
