import React from 'react';
import ReactDOM from 'react-dom'; // This package serves as the entry point to the DOM and server renderers for React.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; // to provide de global store from redux to react app
import store from './store';
import {BrowserRouter} from 'react-router-dom'; // ahora app tiene la capacidad de definir rutas. 


ReactDOM.render(
  <React.StrictMode> 
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
