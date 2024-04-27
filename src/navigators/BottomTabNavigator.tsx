import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomBottomTab} from '@components/customs/CustomBottomTab';
import {ListView} from '@screens/AnimeListView';
import {AnimeStatus} from '@services/Anime/getAnimeSearch';

const Tab = createBottomTabNavigator();

export enum ANIME_STATUS_VIEW {
  AIRING = 'airing',
  COMPLETE = 'complete',
  UPCOMING = 'upcoming',
}

export const BottomTabNavigator = () => {
  const animeListViewData: AnimeStatus[] = [
    ANIME_STATUS_VIEW.AIRING,
    ANIME_STATUS_VIEW.COMPLETE,
    ANIME_STATUS_VIEW.UPCOMING,
  ];

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}>
      {animeListViewData.map(item => (
        <Tab.Screen
          key={item}
          name={item}
          children={() => <ListView status={item} />}
        />
      ))}
    </Tab.Navigator>
  );
};
