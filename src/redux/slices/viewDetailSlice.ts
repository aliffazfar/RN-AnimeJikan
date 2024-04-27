import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  data?: AnimeData;
}

const initialState: InitialState = {};

const langSlice = createSlice({
  name: 'ViewDetail',
  initialState,
  reducers: {
    setViewDetail: (state, action: {payload: AnimeData}) => {
      state.data = action.payload;
    },
  },
});

export const {setViewDetail} = langSlice.actions;
export default langSlice.reducer;
