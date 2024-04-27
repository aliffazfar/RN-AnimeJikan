import React from 'react';
import {
  PauseCircle,
  PlayCircle,
  FastForward,
  Home,
  Menu,
  Heart,
  Search,
  XCircle,
  ArrowLeft,
  Play,
} from 'react-native-feather';
import {SvgProps} from 'react-native-svg';

export type IconName =
  | 'Play'
  | 'Pause'
  | 'FastForward'
  | 'Home'
  | 'Menu'
  | 'Bookmark'
  | 'Search'
  | 'XCircle'
  | 'ArrowLeft'
  | 'Start';

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
      CustomIcon = Heart;
      break;
    case 'Search':
      CustomIcon = Search;
      break;
    case 'XCircle':
      CustomIcon = XCircle;
      break;
    case 'ArrowLeft':
      CustomIcon = ArrowLeft;
      break;
    case 'Start':
      CustomIcon = Play;
      break;
  }

  if (!CustomIcon) return null;
  return <CustomIcon {...otherProps} />;
};
