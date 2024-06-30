import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducer from './reducers/combineReducer';

const initialState = {};

const middleWare = [thunk];

const store = createStore(combineReducer, initialState, composeWithDevTools(
    applyMiddleware(...middleWare)
));

export default store;