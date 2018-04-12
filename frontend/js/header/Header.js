import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as Actions from "./actions";
import HeaderBar from './container';

const Header = ({state, actions}) => {
  return (
    <HeaderBar state={state.header} actions={actions}/>
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


