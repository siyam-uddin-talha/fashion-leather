import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './style/App.css'
import './style/Global.css'
import Reducers from './Redux/CombineReducer';

const store = createStore(Reducers)


ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById('fashion_leather_way_root')
);


