import {Pressable, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {colors} from '@themes/colors';
import {AnimeOrderBy} from '@services/Anime/getAnimeSearch';

interface FilterTabsProps {
  activeItem: AnimeOrderBy;
  setActiveItem: (value: AnimeOrderBy) => void;
  style?: ViewStyle;
}

interface filterItem {
  id: AnimeOrderBy;
  title: string;
}

export const FilterTabs = ({
  style,
  activeItem,
  setActiveItem,
}: FilterTabsProps) => {
  const data: filterItem[] = [
    {id: 'popularity', title: 'Popular'},
    {id: 'score', title: 'Score'},
    {id: 'episodes', title: 'Episodes'},
    {id: 'members', title: 'Members'},
    {id: 'title', title: 'A-Z'},
  ];

  return (
    <View style={style}>
      <FlashList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          const isActive = activeItem === item.id;
          return (
            <Pressable onPress={() => setActiveItem(item.id)}>
              <View
                style={{
                  padding: 5,
                  paddingHorizontal: isActive ? 15 : 5,
                  backgroundColor: isActive
                    ? colors.palette.primary600
                    : 'transparent',
                  borderRadius: 20,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: isActive ? 'white' : colors.palette.neutral500,
                  }}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          );
        }}
        estimatedItemSize={80}
      />
    </View>
  );
};
