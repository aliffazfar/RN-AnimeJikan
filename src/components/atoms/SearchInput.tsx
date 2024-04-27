import {TextInput, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@themes/colors';
import {Icon} from '@components/Icon';

interface SearchInputProps {
  value?: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder?: string;
  onPress?: () => void;
  contentContainerStyle?: ViewStyle;
}

export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  onPress,
  contentContainerStyle,
}: SearchInputProps) => {
  const [isFocused, setFocused] = useState(false);
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
        style={{
          flex: 1,
          color: colors.palette.neutral900,
          padding: 10,
          borderRadius: 20,
        }}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.palette.neutral500}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Icon
        onPress={onPress}
        name="Search"
        width={30}
        color={
          isFocused ? colors.palette.neutral900 : colors.palette.neutral500
        }
        style={{paddingHorizontal: 30}}
      />
    </View>
  );
};
