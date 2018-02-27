import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as Actions from "./actions";
import {HeaderBar} from './components';

const Header = ({state, actions}) => {
    const signInPath = "/accounts/sign-in";
    const signUpPath = "/accounts/sign-up";
    return (
        <HeaderBar state={state.header} actions={actions} signInPath={signInPath} signUpPath={signUpPath}/>
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
)(Header)


