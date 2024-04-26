import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

export const Airing = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{color: '#000'}}>Airing</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({wrapper: {flex: 1}});
