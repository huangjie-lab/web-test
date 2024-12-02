import React from 'react';
import * as  ReactDOM from 'react-dom/client';
import { store } from './store';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import 'antd/dist/reset.css';
import { Routes } from './Routes';
import 'animate.css';
// function setHtmlFont() {
//   const docEl = document.documentElement;

//   // adjust body font size
//   function setBodyFontSize() {
//     if (document.body) {
//       document.body.style.fontSize = '16px';
//     } else {
//       document.addEventListener('DOMContentLoaded', setBodyFontSize);
//     }
//   }
//   setBodyFontSize();

//   function setRemUnit() {
//     let rem = 16;
//     rem = docEl.offsetWidth / 750 * 100;
//     rem = rem > 87 ? 87 : rem;
//     docEl.style.fontSize = `${rem}px`;
//   }

//   setRemUnit();

//   // reset rem unit on page resize
//   window.addEventListener('resize', setRemUnit);
//   window.addEventListener('pageshow', function pageShow(e) {
//     if (e.persisted) {
//       setRemUnit();
//     }
//   });
// }
// setHtmlFont();
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
