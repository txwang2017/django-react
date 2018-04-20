import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Actions from './actions'
import {NewPost, PostList, PostComments} from './container'
import {Route, withRouter, Switch} from 'react-router-dom'
import {NewComment} from "./components"
import NotFound from '../notFound'

const Post = ({state, actions}) => {
  return (
    <div id="posts">
      <Switch>
        <Route path="/post-detail/:uuid" render={(uuid) => (
          <div>
            <PostComments state={state.post}
                          actions={actions}
                          uuid={uuid.match.params.uuid}/>
            <NewComment state={state} actions={actions} uuid={uuid.match.params.uuid}/>
          </div>
        )}/>
        <Route path="/new-post" render={() => (
          <NewPost state={state.post} actions={actions}/>
        )}/>
        <Route path="/" exact render={() => (
          <PostList state={state.post} actions={actions}/>
        )}/>
        <Route path="*" render={() => (
          <NotFound/>
        )}/>
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post))
