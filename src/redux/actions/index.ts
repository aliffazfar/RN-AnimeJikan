import {USER_FAVORITES} from '@redux/constants';

import {createAction} from '@reduxjs/toolkit';

export const userFavorites =
  createAction<Partial<{id: number}>>(USER_FAVORITES);
