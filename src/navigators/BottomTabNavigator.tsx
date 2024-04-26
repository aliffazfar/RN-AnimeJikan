import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Airing} from '@screens/AnimeListView/Airing';
import {colors} from '@themes/colors';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: colors.palette.primary600,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Airing" component={Airing} />
    </Tab.Navigator>
  );
};
