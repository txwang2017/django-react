import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'

import Post from './posts/Post'
import Header from './header/Header'
import postReducer from './posts/reducers'
import headerReducer from './header/reducers'

const reducers = combineReducers({post: postReducer, header: headerReducer})
const store = createStore(reducers, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="main-content">
        <Header/>
        <Post/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
)
