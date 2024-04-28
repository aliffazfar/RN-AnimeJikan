import {ActivityIndicator, Alert, StyleSheet} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Wrapper} from '@components/Wrapper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {SearchInput} from '@components/atoms/SearchInput';
import {PreviewCard} from '@components/PreviewCard';
import {FlashList} from '@shopify/flash-list';
import {
  AnimeOrderBy,
  AnimeStatus,
  getAnimeSearch,
} from '@services/Anime/getAnimeSearch';
import {useDebounce} from '@uidotdev/usehooks';
import {Text} from 'react-native';
import {colors} from '@themes/colors';
import {FilterTabs} from '@components/FilterTabs';
import {useIsMount} from '@hooks/useIsMount';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@navigators/AppNavigator';
import {useAppDispatch} from '@redux/hooks';
import {setViewDetail} from '@redux/slices/viewDetailSlice';

export interface ListViewProps {
  status: AnimeStatus;
}

export const ListView = ({status}: ListViewProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigation>();
  const isMount = useIsMount();

  const [activeItem, setActiveItem] = useState<AnimeOrderBy>('popularity');
  const [searchText, onChangeSearch] = useState<string>('');
  const debouncedSearch = useDebounce(searchText, 200);

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isError,
  } = useInfiniteQuery({
    queryKey: [status, activeItem],
    queryFn: ({pageParam}) =>
      getAnimeSearch({pageParam, status: status, order_by: activeItem}),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
    },
    initialPageParam: 1,
    retry: 3,
    staleTime: 5 * (60 * 1000), // 5 mins
  });

  const {
    data: searchData,
    isFetching: isSearchFetching,
    refetch: searchRefetch,
    hasNextPage: searchHasNextPage,
    fetchNextPage: searchFetchNextPage,
    isFetchingNextPage: isSearchFetchingNextPage,
    isError: isSearchError,
  } = useInfiniteQuery({
    queryKey: [status, searchText],
    queryFn: ({pageParam}) =>
      getAnimeSearch({
        pageParam,
        q: searchText,
        status: status,
        order_by: 'popularity',
      }),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
    },
    initialPageParam: 1,
    enabled: false,
    retry: 3,
    staleTime: 5 * (60 * 1000), // 5 mins
  });

  useEffect(() => {
    if (isError || isSearchError) {
      // *** Example ***
      Alert.alert(
        'Error',
        'An error occurred while fetching Anime',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }, [isError, isSearchError]);

  useEffect(() => {
    if (isMount) return;
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
    ? searchData?.pages.flatMap(page => page.data)
    : data?.pages.flatMap(page => page.data);

  const flattenPagination = searchText
    ? searchData?.pages.flatMap(page => page.pagination)
    : data?.pages.flatMap(page => page.pagination);

  const isNextPageLoading = isFetchingNextPage || isSearchFetchingNextPage;
  const isSearchingLoading = isSearchFetching || searchText !== debouncedSearch;
  const isInitialLoading =
    (isFetching && !isFetchingNextPage && !data) ||
    (isSearchingLoading && !searchData && !isSearchFetchingNextPage);

  const isAllCaughtUp = flattenPagination
    ? !flattenPagination[flattenPagination.length - 1].has_next_page
    : false;

  const loadNext = () => {
    if (debouncedSearch && searchHasNextPage && !isSearchFetching) {
      return searchFetchNextPage();
    }
    if (hasNextPage && !isFetching && !searchText) {
      return fetchNextPage();
    }
  };

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
      {!searchText && (
        <FilterTabs
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          style={styles.filter}
        />
      )}
      {isInitialLoading ? (
        <ActivityIndicator size={'small'} style={styles.spinner} />
      ) : (
        flattenData && (
          <FlashList
            data={flattenData.filter(
              item => !item.rating?.toUpperCase().startsWith('R'),
            )}
            numColumns={2}
            renderItem={({item, index}) => (
              <PreviewCard
                {...item!}
                index={index}
                onPress={() => onPressCard(item)}
              />
            )}
            keyExtractor={keyExtractor}
            onEndReached={loadNext}
            onEndReachedThreshold={0.8}
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
            showsVerticalScrollIndicator={false}
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
