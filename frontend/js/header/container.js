import React from 'react'

import {SignIn, SignUp} from "./components";

class SignPanel extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.setContent = () => {
      switch (this.props.state.displayContent) {
        case 'sign-in':
          return <SignIn state={this.props.state} actions={this.props.actions}/>
        case 'sign-up':
          return <SignUp state={this.props.state} actions={this.props.actions}/>
        default:
          return null
      }
    }
  }
  render() {
    return (
      <div>
        <button type='button'
                className="btn btn-success"
                data-toggle="modal"
                data-target="#popUpWindow">sign in
        </button>
        <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true" id="popUpWindow">
          <div className="modal-dialog" role="document">
            {this.setContent()}
          </div>
        </div>
      </div>
    )
  }
}


export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

  }

  render() {
    return (
      <SignPanel state={this.props.state} actions={this.props.actions}/>
    )
  }
}