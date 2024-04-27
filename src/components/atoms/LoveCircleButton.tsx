import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from '@components/Icon';
import {colors} from '@themes/colors';

interface LoveCircleButtonProps {
  isActive?: boolean;
  onPress: () => void;
}

export const LoveCircleButton = ({
  isActive = false,
  onPress,
}: LoveCircleButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: isActive
          ? colors.palette.angry500
          : colors.palette.neutral100,
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="Bookmark"
        fill={isActive ? colors.palette.neutral100 : colors.palette.neutral100}
        stroke={!isActive ? colors.palette.neutral900 : undefined}
        width={25}
        height={25}
      />
    </TouchableOpacity>
  );
};
