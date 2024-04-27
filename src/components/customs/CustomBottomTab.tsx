import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@themes/colors';
import {Icon, IconName} from '@components/Icon';
import {TabActions} from '@react-navigation/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {ANIME_STATUS_VIEW} from '@navigators/BottomTabNavigator';

export const CustomBottomTab = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;
  return (
    <View style={styles.tabBarStyle}>
      {state.routes.map((route: {key: string; name: string}, index: number) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            const jumpToAction = TabActions.jumpTo(route.name);
            navigation.dispatch(jumpToAction);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: IconName = 'Play';
        switch (route.name) {
          case ANIME_STATUS_VIEW.AIRING:
            iconName = 'Activity';
            break;
          case ANIME_STATUS_VIEW.COMPLETE:
            iconName = 'Play';
            break;
          case ANIME_STATUS_VIEW.UPCOMING:
            iconName = 'FastForward';
            break;
        }

        const stroke = isFocused
          ? colors.palette.primary600
          : colors.palette.neutral900;

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : undefined}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}>
            <Icon
              name={iconName}
              stroke={stroke}
              width={30}
              style={{marginVertical: 5}}
            />
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: stroke,
                },
              ]}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.palette.neutral100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarLabel: {textAlign: 'center', fontSize: 12},
  button: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
