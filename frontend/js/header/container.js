import React from 'react'

import {SignIn, SignUp, Search} from "./components";

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
                className="btn btn-outline-info my-2 my-sm-0"
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

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Search state={this.props.state} actions={this.props.actions}/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse">
          <SignPanel state={this.props.state} actions={this.props.actions}/>
        </div>
      </nav>

    )
  }
}