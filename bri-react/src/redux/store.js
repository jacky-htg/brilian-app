import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './reducers/productReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  products: productReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
