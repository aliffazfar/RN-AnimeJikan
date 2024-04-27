import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Wrapper} from '@components/Wrapper';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {PreviewCard} from '@components/PreviewCard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@navigators/AppNavigator';
import {setViewDetail} from '@redux/slices/viewDetailSlice';
import {SearchInput} from '@components/atoms/SearchInput';
import {colors} from '@themes/colors';

export const FavoriteView = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigation>();
  const userFavorites = useAppSelector(state => state.UserFavorites).favorites;

  const [searchText, onChangeSearch] = useState<string>('');

  const filteredData = userFavorites?.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onPressCard = (item: AnimeData) => {
    dispatch(setViewDetail(item));
    navigation.navigate('DetailView');
  };

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  return (
    <Wrapper style={styles.wrapper}>
      <SearchInput
        placeholder="Search"
        value={searchText}
        onChangeText={onChangeSearch}
        contentContainerStyle={styles.search}
      />
      {userFavorites ? (
        <FlashList
          ListHeaderComponent={
            <View style={styles.genreBox}>
              <Text style={styles.genreText}>My Favorites</Text>
            </View>
          }
          data={searchText ? filteredData : userFavorites}
          numColumns={2}
          renderItem={({item, index}) => (
            <PreviewCard
              {...item!}
              index={index}
              onPress={() => onPressCard(item)}
            />
          )}
          keyExtractor={keyExtractor}
          estimatedItemSize={200}
          ListFooterComponent={
            userFavorites.length === 0 ? (
              <Text style={styles.textDetail}>You have no favorite yet</Text>
            ) : null
          }
        />
      ) : null}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 32},
  search: {marginBottom: 20},
  genreBox: {
    width: 120,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.palette.primary600,
    borderRadius: 20,
  },
  genreText: {textAlign: 'center', color: 'white'},
  textDetail: {
    color: colors.palette.neutral700,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 40,
  },
});
