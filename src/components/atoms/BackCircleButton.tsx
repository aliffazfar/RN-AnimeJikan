import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from '@components/Icon';
import {colors} from '@themes/colors';

interface BackCircleButtonProps {
  onPress: () => void;
}

export const BackCircleButton = ({onPress}: BackCircleButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="ArrowLeft"
        stroke={colors.palette.neutral900}
        width={30}
        height={30}
      />
    </TouchableOpacity>
  );
};
