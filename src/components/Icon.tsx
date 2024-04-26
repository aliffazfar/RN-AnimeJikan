import React from 'react';
import {Check, PlayCircle, Heart, Home, Menu} from 'react-native-feather';
import {SvgProps} from 'react-native-svg';

export type IconName = 'Play' | 'Check' | 'Heart' | 'Home' | 'Menu';

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
    case 'Check':
      CustomIcon = Check;
      break;
    case 'Heart':
      CustomIcon = Heart;
      break;
    case 'Home':
      CustomIcon = Home;
      break;
    case 'Menu':
      CustomIcon = Menu;
      break;
  }

  if (!CustomIcon) return null;
  return <CustomIcon {...otherProps} />;
};
