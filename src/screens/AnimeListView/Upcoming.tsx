import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '@themes/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Upcoming = () => {
  return (
    <SafeAreaView style={globalStyles.containerBase}>
      <Text style={{color: '#000'}}>Upcoming</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
