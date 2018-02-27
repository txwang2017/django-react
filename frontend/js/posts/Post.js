import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from './actions';
import {PostList, NewPost, PostDetail, NewComment} from "./components";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Post = ({state, actions}) => {
    return (

            <div id="posts">
                <Switch>
                    <Route path="/post-detail/:uuid" render={(uuid) => (
                        <div>
                            <PostDetail state={state.post}
                                        actions={actions}
                                        uuid={uuid.match.params.uuid}/>
                            <NewComment state={state.post}
                                        actions={actions}
                                        uuid={uuid.match.params.uuid}/>
                        </div>
                    )}/>
                    <Route path="/" render={() => (
                            <PostList state={state.post} actions={actions}/>
                    )}/>
                    <Route path="/new-post" render={() => (
                        <NewPost state={state.post} actions={actions}/>
                    )}/>
                </Switch>
            </div>

    )
};

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Post)
