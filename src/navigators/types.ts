import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';

// #region Navigator Param Lists
export type RootDrawerParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Favorite: NavigatorScreenParams<FavoriteStackParamList>;
};

export type FavoriteStackParamList = {
  Favorite: undefined;
};

export type HomeTabAStackParamList = {
  TabA: undefined;
  TabADetails: undefined;
};

export type HomeTabBStackParamList = {
  TabB: undefined;
  TabBDetails: undefined;
};

export type HomeTabParamList = {
  'Tab A': NavigatorScreenParams<HomeTabAStackParamList>;
  'Tab B': NavigatorScreenParams<HomeTabBStackParamList>;
};
// #endregion

// #region Other Types
export type TabBarIconPropsType = {
  focused: boolean;
  color: string;
  size: number;
  route?: RouteProp<HomeTabParamList, keyof HomeTabParamList>;
};
// #endregion
