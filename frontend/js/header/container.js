import React from 'react'
import {Link} from 'react-router-dom'

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
                id="sign-in-btn"
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

class AccountInfo extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.handleSignOut = () => {
      this.props.actions.signOut()
    }
  }

  render() {
    return (
      <div id="account-info">
        <img id="avatar" src={this.props.state.userInfo.avatar} className="rounded-circle" height="40" width="40"/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="btn-group">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
            {this.props.state.userInfo.email}
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <button className="dropdown-item" type="button">
              <Link style={{textDecoration: 'none', color: 'black'}} to="/new-post">New post</Link>
            </button>
            <div className="dropdown-divider"/>
            <button className="dropdown-item" type="button" onClick={this.handleSignOut}>
              <a href="#" style={{textDecoration: 'none', color: 'black'}}>Sign out</a>
            </button>
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

    this.setContent = () => {
      if (this.props.state.userInfo.isAuthenticated) {
        return (<AccountInfo state={this.props.state} actions={this.props.actions}/>)
      } else {
        return (<SignPanel state={this.props.state} actions={this.props.actions}/>)
      }
    }
  }

  componentDidMount() {
    this.props.actions.checkAuthentication()
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src='https://s3.amazonaws.com/django-react/icon.png' width="30" height="30"
               className="d-inline-block align-top" alt=""/>
          TX-Wang Blog
        </a>
        <Search state={this.props.state} actions={this.props.actions}/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse">
          {this.setContent()}
        </div>
      </nav>

    )
  }
}