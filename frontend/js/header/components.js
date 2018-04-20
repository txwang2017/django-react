import React from "react"
import {Link} from 'react-router-dom'

export class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.username = ''
    this.password = ''
    this.handleUsername = username => {
      this.username = username.target.value
    }
    this.handlePassword = password => {
      this.password = password.target.value
    }
    this.handleSwitch = () => {
      this.props.actions.setDisplay('sign-up')
    }
    this.handleSubmit = () => {
      this.props.actions.signIn(this.username, this.password)
    }
  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null
    } else {
      return (
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">sign in</h5>
            <button type="button" id="sign-in-close" className="close" data-dismiss="modal" aria-label="Close"/>
            <span aria-hidden="true">&times;</span>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <p><input id="sign-in-username"
                          type="text"
                          className="form-control"
                          placeholder="username"
                          onChange={this.handleUsername}/>
                </p>
                <p><input id="sign-in-password"
                          type="password"
                          className="form-control"
                          placeholder="password"
                          onChange={this.handlePassword}/>
                </p>
                <label className="col-form-label" id="sign-in-error">{this.props.state.signInError}</label>
              </div>
            </form>
            <div className="modal-footer">
              <button className="btn btn-primary"
                      id="sign-in-submit"
                      onClick={this.handleSubmit}>Sign In
              </button>
              <button className="btn btn-link" onClick={this.handleSwitch}>Don't have an account? Sign up here.</button>
            </div>
          </div>
        </div>
      )
    }
  }
}

export class SignUp extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.username = ''
    this.email = ''
    this.password1 = ''
    this.password2 = ''
    this.avatar = null

    this.handleEmail = email => {
      this.email = email.target.value
    }

    this.handlePassword1 = password1 => {
      this.password1 = password1.target.value
    }

    this.handlePassword2 = password2 => {
      this.password2 = password2.target.value
    }

    this.handleUsername = username => {
      this.username = username.target.value
    }
    this.handleAvatar = avatar => {
      this.avatar = avatar.target.files[0]
      this.props.actions.setAvatarName(this.avatar.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        this.avatar = reader.result
      }
      reader.readAsArrayBuffer(this.avatar)
    }

    this.handleSwitch = () => {
      this.props.actions.setDisplay('sign-in')
    }
    this.handleSubmit = () => {
      this.props.actions.signUp(this.username, this.email, this.password1, this.password2, this.avatar)
    }

  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null
    } else {
      return (
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">sign up</h5>
            <button type="button" id="sign-up-close" className="close" data-dismiss="modal" aria-label="Close"/>
            <span aria-hidden="true">&times;</span>
          </div>
          <div className="modal-body">
            <form>
              <p><input id="sign-up-username"
                        type="text"
                        className="form-control"
                        placeholder="username"
                        onChange={this.handleUsername}/>
              </p>
              <p><input id="sign-up-email"
                        type="text"
                        className="form-control"
                        placeholder="email"
                        onChange={this.handleEmail}/>
              </p>
              <p><input id="sign-up-password1"
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={this.handlePassword1}/>
              </p>
              <p><input id="sign-up-password2"
                        type="password"
                        className="form-control"
                        placeholder="enter password again"
                        onChange={this.handlePassword2}/>
              </p>
              <div className="custom-file">
                <input type="file"
                       className="custom-file-input"
                       id="customFile"
                       accept="image/png, image/jpeg"
                       onChange={this.handleAvatar}/>
                <label className="custom-file-label"
                       htmlFor="customFile">{this.props.state.avatarName || 'upload avatar'}</label>
              </div>
              <label className="col-form-label" id="sign-up-error">{this.props.state.signUpError}</label>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary"
                    id="sign-up-submit"
                    onClick={this.handleSubmit}>Sign Up
            </button>
            <button className="btn btn-link" onClick={this.handleSwitch}>Already have an account? Sign in here.</button>
          </div>
        </div>
      )
    }
  }
}

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.searchKeywords = ''
    this.searchType = 'title'

    this.handleSearchKeywords = searchKeywords => {
      this.searchKeywords = searchKeywords.target.value
    }

    this.handleSubmit = () => {
      this.props.actions.search(this.searchKeywords)
    }

    this.handleSearchType = searchType => {
      this.searchType = searchType.target.value
    }
  }

  render() {
    return (
      <div className="input-group" id="search-bar">
        <input type="text" className="form-control" onChange={this.handleSearchKeywords} placeholder="Search"/>
        <button onClick={this.handleSubmit} id="search-btn">
          <img src='https://s3.amazonaws.com/django-react/search.png' height="36" width="36"/>
        </button>
      </div>
    )
  }
}