import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyles} from '@themes/globalStyles';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@themes/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@navigators/AppNavigator';
import {PlayButton} from '@components/atoms/PlayButton';
import {BackCircleButton} from '@components/atoms/BackCircleButton';
import {LoveCircleButton} from '@components/atoms/LoveCircleButton';
import {removeFavorite, setFavorite} from '@redux/slices/userFavorites';

const {width, height} = Dimensions.get('screen');
const bannerHeight = height / 1.8;

export const AnimeDetailView = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigation>();
  const data = useAppSelector(state => state.ViewDetail).data as AnimeData;
  const userFavorites = useAppSelector(state => state.UserFavorites).favorites;

  const isUserCurrentFav = userFavorites?.some(
    item => item.mal_id === data.mal_id,
  );

  let details: string[] = [];

  if (data?.rating) details.push(data.rating);
  if (data?.score) details.push(String(data.score));
  if (data?.year) details.push(String(data.year));

  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const addFavorite = () => {
    if (isUserCurrentFav) return dispatch(removeFavorite(data));
    dispatch(setFavorite(data));
  };

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  return (
    <SafeAreaView style={globalStyles.containerBase}>
      <View style={styles.backgroundImg}>
        <FastImage
          style={styles.imgSize}
          source={{
            uri: data.images.jpg.image_url,
            priority: FastImage.priority.normal,
            cache: 'immutable',
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <LinearGradient
          colors={['rgba(252, 252, 252, 0)', colors.background]}
          style={styles.overlay}
        />
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.flex1}>
          <BackCircleButton onPress={() => navigation.goBack()} />
        </View>
        <LoveCircleButton onPress={addFavorite} isActive={isUserCurrentFav} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: bannerHeight - 100}} />
        <View style={styles.contentWrapper}>
          <View style={styles.contentHeader}>
            <View style={styles.flex1}>
              <Text style={styles.title}>{data.title}</Text>
              {details.map(item => (
                <Text key={item} style={styles.detailText}>
                  {item}
                </Text>
              ))}
            </View>
            {data?.url && <PlayButton onPress={() => openURL(data.url)} />}
          </View>
          <Text style={styles.synopisText}>{data.synopsis}</Text>
          {data.genres.length > 0 && (
            <View style={styles.genreContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.genres.map((item, index) => (
                  <View key={index} style={styles.genreBox}>
                    <Text style={styles.genreText}>{item.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  backgroundImg: {position: 'absolute', zIndex: 0},
  imgSize: {height: bannerHeight, width},
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: 32,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: bannerHeight / 6,
    bottom: 0,
  },
  contentWrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
  },
  contentHeader: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.palette.neutral900,
    fontSize: 32,
    fontWeight: '900',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  genreBox: {
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.palette.primary600,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreText: {textAlign: 'center', color: 'white'},
  synopisText: {color: colors.palette.neutral900, fontSize: 14},
  detailText: {
    color: colors.palette.neutral900,
    fontSize: 14,
  },
});
