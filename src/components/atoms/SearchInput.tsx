import {TextInput, View, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '@themes/colors';
import {Icon} from '@components/Icon';

interface SearchInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPress?: () => void;
  contentContainerStyle?: ViewStyle;
}

export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  contentContainerStyle,
}: SearchInputProps) => {
  return (
    <View
      style={[
        {
          width: '100%',
          justifyContent: 'center',
          borderColor: colors.palette.neutral500,
          borderWidth: 1,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        },
        contentContainerStyle,
      ]}>
      <TextInput
        value={value}
        style={{
          flex: 1,
          color: colors.palette.neutral900,
          padding: 10,
          borderRadius: 20,
        }}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.palette.neutral500}
      />
      <Icon
        onPress={value ? () => onChangeText('') : undefined}
        name={value ? 'XCircle' : 'Search'}
        width={30}
        color={value ? colors.palette.neutral900 : colors.palette.neutral500}
        style={{paddingHorizontal: 30}}
      />
    </View>
  );
};
