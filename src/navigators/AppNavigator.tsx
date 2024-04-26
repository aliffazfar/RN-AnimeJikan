import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabNavigator} from './BottomTabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteView} from '@screens/FavoriteView';
import {CustomDrawer} from '@components/customs/CustomDrawer';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const AppDrawer = function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={() => ({
        headerShown: false,
        swipeEnabled: true,
        swipeEdgeWidth: width / 2,
      })}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Favorite" component={FavoriteView} />
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
