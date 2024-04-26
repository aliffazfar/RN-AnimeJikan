import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Icon} from './Icon';
import {colors} from '@themes/colors';

export const PreviewCard = (props: TopAiringData) => {
  const {images, title, score} = props;

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.img}
        source={{
          uri: images.jpg.image_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View style={styles.detail}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Icon name="Bookmark" width={20} stroke={colors.palette.primary600} />
      </View>
      <Text style={styles.score}>Score: {score} / 10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '45%',
  },
  img: {width: 150, height: 200, borderRadius: 10},
  detail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    color: colors.palette.neutral900,
    fontWeight: '900',
    flex: 1,
    padding: 0,
  },
  score: {color: colors.palette.neutral700, fontSize: 11},
});
