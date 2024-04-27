import {combineReducers} from 'redux';
import ViewDetail from '../slices/viewDetailSlice';
import UserFavorites from '../slices/userFavorites';

export default combineReducers({ViewDetail, UserFavorites});
