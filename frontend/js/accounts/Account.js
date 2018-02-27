import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as Actions from './actions';
import {SignIn, SignUp, Header} from './components';

const Account = ({state, actions}) => {
    const signInPath = "/accounts/sign-in";
    const signUpPath = "/accounts/sign-up";
    return (
        <div id="account">
            <BrowserRouter>
                <div>
                <Header state={state.account}
                        actions={actions}
                        signInPath={signInPath}
                        signUpPath={signUpPath}/>
                <div id="user-sign">
                    <Route path={signInPath} render={() => (
                        <SignIn state={state.account} actions={actions.signIn}/>
                    )}/>
                    <Route path={signUpPath} render={() => (
                        <SignUp state={state.account} actions={actions.signUp}/>
                    )}/>
                </div>
                </div>
            </BrowserRouter>
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