import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Wrapper} from '@components/Wrapper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchTopAiring} from '@services/Anime/fetchTopAiring';
import {SearchInput} from '@components/atoms/SearchInput';
import {PreviewCard} from '@components/PreviewCard';
import {FlashList} from '@shopify/flash-list';
import {getAnimeSearch} from '@services/Anime/getAnimeSearch';
import {useDebounce} from '@uidotdev/usehooks';

export const Airing = () => {
  const [searchText, onChangeSearch] = useState('');
  const debouncedSearch = useDebounce(searchText, 300);

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

  const {
    data: queryData,
    isLoading: isQueryFetching,
    refetch,
    hasNextPage: queryHasNextPage,
    fetchNextPage: queryFetchNextPage,
    isFetchingNextPage: queryIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getAnimeSearch'],
    queryFn: ({pageParam}) => getAnimeSearch({pageParam, query: searchText}),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
    },
    initialPageParam: 1,
    enabled: false,
    retry: false,
    staleTime: 10000,
  });

  useEffect(() => {
    if (debouncedSearch) {
      refetch();
    }
  }, [debouncedSearch]);

  const isInitialLoading = isFetching && !data;
  const isSearchingLoading = isQueryFetching || searchText !== debouncedSearch;
  const isNextPageLoading = isFetchingNextPage || queryIsFetchingNextPage;

  const flattenData = searchText
    ? queryData?.pages.flatMap(page => page.data)
    : data?.pages.flatMap(page => page.data);

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  const loadNext = () => {
    if (debouncedSearch && queryHasNextPage && !isQueryFetching) {
      return queryFetchNextPage();
    }
    if (hasNextPage && !isFetching) {
      return fetchNextPage();
    }
  };

  return (
    <Wrapper style={styles.wrapper}>
      <SearchInput
        placeholder="Search"
        value={searchText}
        onChangeText={onChangeSearch}
        contentContainerStyle={styles.search}
      />
      {isInitialLoading || isSearchingLoading ? (
        <ActivityIndicator size={'small'} style={styles.spinner} />
      ) : (
        flattenData && (
          <FlashList
            data={flattenData}
            numColumns={2}
            renderItem={({item, index}) => (
              <PreviewCard {...item} index={index} />
            )}
            keyExtractor={keyExtractor}
            onEndReached={loadNext}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isNextPageLoading ? (
                <ActivityIndicator size={'small'} style={styles.spinner} />
              ) : null
            }
            estimatedItemSize={200}
          />
        )
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
