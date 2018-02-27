import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Account from './accounts/Account';
import Post from './posts/Post';
import accountReducer from "./accounts/reducers";
import postReducer from './posts/reducers';

const reducers = combineReducers({account: accountReducer, post: postReducer});
const store = createStore(reducers, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <div id="main-content">
            <Account/>
            <Post/>
        </div>
    </Provider>,
    document.getElementById('main')
);
