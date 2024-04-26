import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Airing} from '@screens/AnimeListView/Airing';
import {Complete} from '@screens/AnimeListView/Complete';
import {Upcoming} from '@screens/AnimeListView/Upcoming';
import {CustomBottomTab} from '@components/customs/CustomBottomTab';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Airing" component={Airing} />
      <Tab.Screen name="Complete" component={Complete} />
      <Tab.Screen name="Upcoming" component={Upcoming} />
    </Tab.Navigator>
  );
};
