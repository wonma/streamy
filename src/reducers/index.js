import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamsReducer from './streamsReducer';

export default combineReducers({
    auth: authReducer, // the value is an object-type data
    form: formReducer,
    streams: streamsReducer
});