import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import 'antd/dist/reset.css';
import { Routes } from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
