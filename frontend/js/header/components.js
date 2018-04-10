import React from "react";
import {Link} from 'react-router-dom';

export class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.username = '';
    this.password = '';
    this.handleUsername = username => {
      this.username = username.target.value;
    };
    this.handlePassword = password => {
      this.password = password.target.value;
    };
    this.handleSwitch = () => {
      this.props.actions.setDisplay('sign-up')
    }
    this.handleSubmit = () => {
      console.log(this.props.state)
      this.props.actions.signIn(this.username, this.password);
    };
  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null;
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
    super();
    this.props = props;
    this.username = '';
    this.email = '';
    this.password1 = '';
    this.password2 = '';

    this.handleEmail = email => {
      this.email = email.target.value;
    };

    this.handlePassword1 = password1 => {
      this.password1 = password1.target.value;
    };

    this.handlePassword2 = password2 => {
      this.password2 = password2.target.value;
    };

    this.handleUsername = username => {
      this.username = username.target.value;
    };

    this.handleSwitch = () => {
      this.props.actions.setDisplay('sign-in')
    }
    this.handleSubmit = () => {
      this.props.actions.signUp(this.username, this.email, this.password1, this.password2);
    };

  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null;
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
              <label className="col-form-label" id="sign-up-error">{this.props.state.signUpError}</label>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary"
                    id="sign-up-submit"
                    onClick={this.handleSubmit}>Sign Up
            </button>
            <button className="btn btn-link" onClick={this.handleSwitch}>Already have an account? Sign up here.</button>
          </div>
        </div>
      )
    }
  }
}

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.searchKeywords = '';

    this.handleSearchKeywordsChange = searchKeywords => {
      this.searchKeywords = searchKeywords.target.value;
    };

    this.handleSubmit = () => {
      this.props.actions.search({searchKeywords: this.searchKeywords});
    };
  }

  render() {
    return (
      <form className="form-inline">
        <input type="text" className="form-control mr-sm-2" onChange={this.handleSearchKeywordsChange}/>
        <button className="btn btn-outline-info my-2 my-sm-0" onClick={this.handleSubmit}>Search</button>
      </form>
    )
  }
}

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.setContent = () => {
      if (this.props.state.userInfo.isAuthenticated === true) {
        return (
          <span id="user-info">{this.props.state.userInfo.email}</span>
        );
      } else {
        return (
          111
        );
      }
    };

    this.setSignOutButton = () => {
      let signOutButton = '';
      if (this.props.state.userInfo.isAuthenticated) {
        signOutButton =
          <button className="btn btn-link" id="sign-out-submit" onClick={this.props.actions.signOut}>sign out</button>
      } else {
        signOutButton = null;
      }
      return signOutButton;
    };

    this.setNewPostButton = () => {
      if (this.props.state.userInfo.isAuthenticated === true) {
        return (
          <div id="new-post-link">
            <Link to="/new-post">new post</Link>
          </div>
        )
      } else {
        return null;
      }
    };

    this.setSignUpPanel = () => {
      if (this.props.state.signUpDisplay === true) {
        return (<SignUp state={this.props.state} actions={this.props.actions}/>);
      } else {
        return null;
      }
    };

    this.handleSignIn = () => {
      this.props.actions.displaySignUp(false);
      this.props.actions.displaySignIn(true);
    };

    this.handleSignUp = () => {
      this.props.actions.displaySignUp(true);
      this.props.actions.displaySignIn(false);
    };
  }

  componentWillMount() {
    this.props.actions.checkAuthentication();
  }

  render() {
    return (
      <div id="account-header">
        <Search state={this.props.state} actions={this.props.actions}/>
        {this.setContent()}
        {this.setSignOutButton()}
        {this.setNewPostButton()}
        <div id="user-sign">
          {this.setSignUpPanel()}
        </div>
      </div>
    )
  }
}