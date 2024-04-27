import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Wrapper} from '@components/Wrapper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {SearchInput} from '@components/atoms/SearchInput';
import {PreviewCard} from '@components/PreviewCard';
import {FlashList} from '@shopify/flash-list';
import {AnimeOrderBy, getAnimeSearch} from '@services/Anime/getAnimeSearch';
import {useDebounce} from '@uidotdev/usehooks';
import {Text} from 'react-native';
import {colors} from '@themes/colors';
import {FilterTabs} from '@components/FilterTabs';

export const Airing = () => {
  const [activeItem, setActiveItem] = useState<AnimeOrderBy>('popularity');
  const [searchText, onChangeSearch] = useState<string>('');
  const debouncedSearch = useDebounce(searchText, 300);

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['topAiring'],
    queryFn: ({pageParam}) =>
      getAnimeSearch({pageParam, status: 'airing', order_by: activeItem}),
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
    isFetching: isSearchFetching,
    refetch: searchRefetch,
    hasNextPage: searchHasNextPage,
    fetchNextPage: searchFetchNextPage,
    isFetchingNextPage: isSearchFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getAnimeSearch'],
    queryFn: ({pageParam}) =>
      getAnimeSearch({
        pageParam,
        q: searchText,
        status: 'airing',
        order_by: 'popularity',
      }),
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
    if (activeItem) {
      refetch();
    }
  }, [activeItem]);

  useEffect(() => {
    if (debouncedSearch) {
      searchRefetch();
    }
  }, [debouncedSearch]);

  const flattenData = searchText
    ? queryData?.pages.flatMap(page => page.data)
    : data?.pages.flatMap(page => page.data);

  const flattenPagination = searchText
    ? queryData?.pages.flatMap(page => page.pagination)
    : data?.pages.flatMap(page => page.pagination);

  const isLoading = isFetching || !data;
  const isSearchingLoading = isSearchFetching || searchText !== debouncedSearch;
  const isNextPageLoading = isFetchingNextPage || isSearchFetchingNextPage;
  const isAllCaughtUp = flattenPagination
    ? !flattenPagination[0].has_next_page
    : false;

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  const loadNext = () => {
    if (debouncedSearch && searchHasNextPage && !isSearchFetching) {
      return searchFetchNextPage();
    }
    if (hasNextPage && !isFetching && !searchText) {
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
      {!searchText && (
        <FilterTabs
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          style={styles.filter}
        />
      )}
      {isLoading || isSearchingLoading ? (
        <ActivityIndicator size={'small'} style={styles.spinner} />
      ) : (
        flattenData && (
          <FlashList
            data={flattenData}
            numColumns={2}
            renderItem={({item, index}) => (
              <PreviewCard {...item!} index={index} />
            )}
            keyExtractor={keyExtractor}
            onEndReached={loadNext}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <Fragment>
                {isNextPageLoading && (
                  <ActivityIndicator size={'small'} style={styles.spinner} />
                )}
                {isAllCaughtUp && (
                  <Text style={styles.textDetail}>You're all caught up</Text>
                )}
              </Fragment>
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
  filter: {marginBottom: 10},
  textDetail: {
    color: colors.palette.neutral700,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 40,
  },
});
