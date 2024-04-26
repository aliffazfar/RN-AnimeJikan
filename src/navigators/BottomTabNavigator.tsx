import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Airing} from '@screens/AnimeListView/Airing';
import {colors} from '@themes/colors';
import {Icon, IconName} from '@components/Icon';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName: IconName = 'Play';
          switch (route.name) {
            case 'Airing':
              iconName = 'Play';
              break;
            case 'Complete':
              iconName = 'Check';
              break;
            case 'Upcoming':
              iconName = 'Heart';
              break;
          }
          return <Icon name={iconName} stroke={color} width={20} />;
        },
        tabBarActiveTintColor: colors.palette.primary600,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Airing" component={Airing} />
      <Tab.Screen name="Complete" component={Airing} />
      <Tab.Screen name="Upcoming" component={Airing} />
    </Tab.Navigator>
  );
};
