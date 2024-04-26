import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@themes/colors';
import React from 'react';
import {Icon, IconName} from '@components/Icon';
import {StyleSheet} from 'react-native';

export const CustomDrawer = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const {drawerInactiveTintColor, drawerInactiveBackgroundColor} =
    focusedOptions;

  return (
    <DrawerContentScrollView>
      <SafeAreaView style={styles.container}>
        {state.routes.map((route, i) => {
          const focused = i === state.index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate({name: route.name, merge: true})),
                target: state.key,
              });
            }
          };

          const {
            title,
            drawerLabel,
            drawerLabelStyle,
            drawerItemStyle,
            drawerAllowFontScaling,
          } = descriptors[route.key].options;

          let iconName: IconName = 'Home';
          switch (route.name) {
            case 'Home':
              iconName = 'Home';
              break;
            case 'Favorite':
              iconName = 'Bookmark';
              break;
          }

          const stroke = focused
            ? colors.palette.primary600
            : colors.palette.neutral900;

          return (
            <DrawerItem
              key={route.key}
              label={
                drawerLabel !== undefined
                  ? drawerLabel
                  : title !== undefined
                  ? title
                  : route.name
              }
              icon={() => (
                <Icon
                  name={iconName}
                  stroke={stroke}
                  width={30}
                  style={{marginVertical: 5}}
                />
              )}
              focused={focused}
              activeTintColor={colors.palette.primary600}
              inactiveTintColor={drawerInactiveTintColor}
              activeBackgroundColor={colors.palette.primary100}
              inactiveBackgroundColor={drawerInactiveBackgroundColor}
              allowFontScaling={drawerAllowFontScaling}
              labelStyle={drawerLabelStyle}
              style={drawerItemStyle}
              to={buildLink(route.name, route.params)}
              onPress={onPress}
            />
          );
        })}
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 10,
  },
});
