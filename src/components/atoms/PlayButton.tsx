import {TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '@themes/colors';
import {Icon} from '@components/Icon';

interface PlayButtonProps {
  onPress: () => void;
}

export const PlayButton = ({onPress}: PlayButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: colors.palette.primary600,
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="Start"
        fill={colors.palette.neutral100}
        width={40}
        height={40}
        style={{marginLeft: 5}}
      />
    </TouchableOpacity>
  );
};
