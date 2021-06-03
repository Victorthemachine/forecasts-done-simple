import { combineReducers } from 'redux';


import darkmodeReducer from './darkmode.reducer';


const rootReducer = combineReducers({
    darkmode: darkmodeReducer,
});

export default rootReducer;