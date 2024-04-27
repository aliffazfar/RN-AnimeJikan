import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {StoreRootState, StoreDispatchType} from './store/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => StoreDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreRootState> = useSelector;
