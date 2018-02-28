import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HashRouter, Route} from 'react-router-dom';

import * as Actions from './actions';
import {SignIn, SignUp} from './components';

const Account = ({state, actions}) => {
  const signInPath = "/accounts/sign-in";
  const signUpPath = "/accounts/sign-up";
  return (
    <div id="account">
      <HashRouter>
        <div id="user-sign">
          <Route exact path={signInPath} render={() => (
            <SignIn state={state} actions={actions.signIn}/>
          )}/>
          <Route exact path={signUpPath} render={() => (
            <SignUp state={state} actions={actions.signUp}/>
          )}/>
        </div>
      </HashRouter>
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
  mapDispatchToProps
)(Account)