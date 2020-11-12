import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import artistReducers from './store/reducers/artistReducers';
import albumReducers from './store/reducers/albumReducers';
import trackReducers from './store/reducers/trackReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  artist: artistReducers,
  album: albumReducers,
  track: trackReducers
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);
