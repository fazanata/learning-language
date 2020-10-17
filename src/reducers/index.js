import {combineReducers} from 'redux';
import cardListReducer from './cardListReducers';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    cardList: cardListReducer,
});

