import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Wrapper} from '@components/Wrapper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchTopAiring} from '@services/Anime/fetchTopAiring';
import {SearchInput} from '@components/atoms/SearchInput';
import {PreviewCard} from '@components/PreviewCard';

export const Airing = () => {
  const [searchText, onChangeSearch] = useState('');

  const {data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['topAiring'],
      queryFn: fetchTopAiring,
      getNextPageParam: lastPage => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        }
      },
      initialPageParam: 1,
      retry: false,
      staleTime: 10000,
    });

  const isInitialLoading = isFetching && !isFetchingNextPage;
  const flattenData = data && data.pages.flatMap(page => page.data);

  const loadNext = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <Wrapper style={styles.wrapper}>
      {flattenData && (
        <FlatList
          ListHeaderComponent={
            <SearchInput
              placeholder="Search"
              value={searchText}
              onChangeText={onChangeSearch}
              onPress={() => {}}
              contentContainerStyle={styles.search}
            />
          }
          data={flattenData}
          numColumns={2}
          columnWrapperStyle={styles.flatListColumnWrapper}
          renderItem={({item}) => <PreviewCard {...item} />}
          keyExtractor={item => item.mal_id.toString()}
          onEndReached={loadNext}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size={'small'} style={styles.spinner} />
            ) : null
          }
        />
      )}
      {isInitialLoading && (
        <ActivityIndicator size={'small'} style={styles.spinner} />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 32},
  spinner: {marginVertical: 40},
  flatListColumnWrapper: {justifyContent: 'space-between'},
  search: {marginBottom: 20},
});
