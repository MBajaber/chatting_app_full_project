import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ChatReducer from './store/reducers/chatReducer';
import UserReducer from './store/reducers/userReducer';

const combinesReducer = combineReducers({
  chat: ChatReducer,
  user: UserReducer
});

const store = createStore(combinesReducer, applyMiddleware());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
