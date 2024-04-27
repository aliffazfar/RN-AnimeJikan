import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Icon} from './Icon';
import {colors} from '@themes/colors';

interface PreviewCardProps extends AnimeData {
  index: number;
  onPress: () => void;
}

export const PreviewCard = (props: PreviewCardProps) => {
  const {images, title, score, index, rating, year, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={index}
      style={[
        styles.container,
        index % 2 ? {paddingLeft: 10} : {paddingRight: 10},
      ]}
      onPress={onPress}>
      <FastImage
        style={styles.img}
        source={{
          uri: images.jpg.image_url,
          priority: FastImage.priority.normal,
          cache: 'immutable',
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View style={styles.detail}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Icon name="Bookmark" width={20} stroke={colors.palette.primary600} />
      </View>
      <Text style={styles.textDetail}>{rating}</Text>
      {score && <Text style={styles.textDetail}>Score: {score}/10</Text>}
      {year && <Text style={styles.textDetail}>Year: {year}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
  },
  img: {width: '100%', height: 200, borderRadius: 10},
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
  textDetail: {color: colors.palette.neutral700, fontSize: 11},
});
