import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './Redux/provider/CombineReducer'


const store = createStore(Reducers)


ReactDOM.render(
  <React.Fragment>
    <Router>
      <Provider store={store} >
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('dashbord_root')
);

