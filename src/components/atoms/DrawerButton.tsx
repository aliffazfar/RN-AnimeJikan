import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '@navigators/types';
import {Image, Pressable, ViewStyle} from 'react-native';
import {LOCAL_IMAGES} from '@assets/images';

interface DrawerButtonProps {
  style?: ViewStyle;
}

export const DrawerButton = ({style}: DrawerButtonProps) => {
  const {toggleDrawer} =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Pressable onPress={() => toggleDrawer()} style={style}>
      <Image source={LOCAL_IMAGES.hamburger} />
    </Pressable>
  );
};
