import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '@themes/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Complete = () => {
  return (
    <SafeAreaView style={globalStyles.containerBase}>
      <Text style={{color: '#000'}}>Complete</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
