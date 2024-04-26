import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {DrawerButton} from './atoms/DrawerButton';
import {globalStyles} from '@themes/globalStyles';
import {LOCAL_IMAGES} from '@assets/images';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({children}: WrapperProps) => {
  return (
    <SafeAreaView style={globalStyles.containerBase}>
      <View style={styles.container}>
        <DrawerButton style={{flex: 1}} />
        <Pressable
          onPress={() => Alert.alert('Mockup', 'User profile picture')}>
          <Image
            source={LOCAL_IMAGES.profilePicDemo}
            style={styles.profilePic}
          />
        </Pressable>
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
