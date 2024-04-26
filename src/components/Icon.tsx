import React from 'react';
import {
  PauseCircle,
  PlayCircle,
  FastForward,
  Home,
  Menu,
  Bookmark,
  Search,
} from 'react-native-feather';
import {SvgProps} from 'react-native-svg';

export type IconName =
  | 'Play'
  | 'Pause'
  | 'FastForward'
  | 'Home'
  | 'Menu'
  | 'Bookmark'
  | 'Search';

interface IconProps extends SvgProps {
  name: IconName;
}

export const Icon = (props: IconProps) => {
  const {name, ...otherProps} = props;

  let CustomIcon: React.ElementType | undefined;

  switch (name) {
    case 'Play':
      CustomIcon = PlayCircle;
      break;
    case 'Pause':
      CustomIcon = PauseCircle;
      break;
    case 'FastForward':
      CustomIcon = FastForward;
      break;
    case 'Home':
      CustomIcon = Home;
      break;
    case 'Menu':
      CustomIcon = Menu;
      break;
    case 'Bookmark':
      CustomIcon = Bookmark;
      break;
    case 'Search':
      CustomIcon = Search;
      break;
  }

  if (!CustomIcon) return null;
  return <CustomIcon {...otherProps} />;
};
