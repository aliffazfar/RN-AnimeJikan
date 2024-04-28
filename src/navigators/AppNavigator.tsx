import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  NavigationProp,
} from '@react-navigation/native';
import {BottomTabNavigator} from './BottomTabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FavoriteView} from '@screens/FavoriteView';
import {CustomDrawer} from '@components/customs/CustomDrawer';
import {Dimensions} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '@themes/colors';
import {AnimeDetailView} from '@screens/AnimeDetailView';
import {Platform, StatusBar} from 'react-native';

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

export type ScreenNames = ['Root', 'DetailView'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={AppDrawer} />
      <Stack.Screen name="DetailView" component={AnimeDetailView} />
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  StatusBar.setBarStyle('dark-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };
  return (
    <NavigationContainer {...props} theme={navTheme}>
      <AppStack />
    </NavigationContainer>
  );
};
