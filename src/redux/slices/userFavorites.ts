import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  favorites: AnimeData[];
}

const initialState: InitialState = {
  favorites: [],
};

const langSlice = createSlice({
  name: 'userFavorites',
  initialState,
  reducers: {
    setFavorite: (state, action: {payload: AnimeData}) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: {payload: AnimeData}) => {
      state.favorites = state.favorites.filter(
        item => item.mal_id !== action.payload.mal_id,
      );
    },
  },
});

export const {setFavorite, removeFavorite} = langSlice.actions;
export default langSlice.reducer;
