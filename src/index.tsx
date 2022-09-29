import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from 's1-main/m1-ui/App';
import reportWebVitals from './reportWebVitals';
import {store} from './s1-main/m2-bll/store';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
