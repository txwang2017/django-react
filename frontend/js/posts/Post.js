import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Actions from './actions'
import {NewComment} from "./components"
import {NewPost, PostList, PostComments} from './container'
import {Route, Switch, HashRouter} from 'react-router-dom'

const Post = ({state, actions}) => {
  return (
    <HashRouter>
      <div id="posts">
        <Switch>
          <Route path="/post-detail/:uuid" render={(uuid) => (
            <div>
              <PostComments state={state.post}
                          actions={actions}
                          uuid={uuid.match.params.uuid}/>
              <NewComment state={state}
                          actions={actions}
                          uuid={uuid.match.params.uuid}/>
            </div>
          )}/>
          <Route path="/new-post" render={() => (
            <NewPost state={state.post} actions={actions}/>
          )}/>
          <Route path="/" render={() => (
            <PostList state={state.post} actions={actions}/>
          )}/>
        </Switch>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post)
