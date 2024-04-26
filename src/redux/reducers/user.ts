import {userFavorites} from '@redux/actions';

import {createReducer} from '@reduxjs/toolkit';

type InitialStateType = {};

const initialState: InitialStateType = {};

export default createReducer(initialState, builder => {
  builder
    .addCase(userFavorites, (state, action) => {
      return {
        ...state,

        userData: {...action.payload},
      };
    })
    .addDefaultCase(state => {
      return state;
    });
});
