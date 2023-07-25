import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';

import Signup from './pages/Signup';
import ItemMain from './pages/about_Item/ItemMain';
import FindId from './pages/about_membership/FindId';
import FindPw from './pages/about_membership/Find_pw';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './pages/about_membership/user_reducer';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <BrowserRouter>
    <Provider 
      store={createStoreWithMiddleware(Reducer, 
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
      <Routes>
        {/* 메인 페이지 */}
        <Route exact path="/" element={<App />} /> 
        {/* 회원가입 */}
        <Route exact path="/signup" element={<Signup />} />
        
        <Route exact path="/find-id" element={<FindId />} />
        <Route exact path="/find-pw" element={<FindPw />} />
        {/* 로그인하고 보이는 첫 창*/}
        <Route exact path="/itemmain" element={<ItemMain />} />
      </Routes>
      </Provider>
    </BrowserRouter>
   </React.StrictMode>
);

reportWebVitals();
