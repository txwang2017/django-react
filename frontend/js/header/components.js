import React from "react";
import {Link} from 'react-router-dom';

export class SignIn extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.email = '';
    this.password = '';
    this.handleEmail = email => {
      this.email = email.target.value;
    };
    this.handlePassword = password => {
      this.password = password.target.value;
    };
    this.handleSubmit = () => {
      this.props.actions.signIn(this.email, this.password);
    };
    this.handleClose = () => {
      this.props.actions.displaySignIn(false);
      this.props.actions.displaySignUp(false);
    }
  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null;
    } else {
      return (
        <div id="sign-in">
          <p><input id="sign-in-email"
                    type="text"
                    placeholder="email address"
                    onChange={this.handleEmail}/>
          </p>
          <p><input id="sign-in-password"
                    type="password"
                    placeholder="password"
                    onChange={this.handlePassword}/>
          </p>
          <div id="sign-in-error-message">{this.props.state.signInError.errorMessage}</div>
          <button className="btn btn-primary"
                  id="sign-in-submit"
                  onClick={this.handleSubmit}>Sign In
          </button>
          <button id="sign-in-cancle"
                  className="btn btn-warning btn-circle"
                  onClick={this.handleClose}>
            X
          </button>
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

    this.handleSubmit = () => {
      this.props.actions.signUp(this.username, this.email, this.password1, this.password2);
    };

    this.handleClose = () => {
      this.props.actions.displaySignIn(false);
      this.props.actions.displaySignUp(false);
    }
  }

  render() {
    if (this.props.state.userInfo.isAuthenticated) {
      return null;
    } else {
      return (
        <div id="sign-up">
          <p><input id="sign-up-username"
                    type="text"
                    placeholder="username"
                    onChange={this.handleUsername}/>
          </p>
          <p><input id="sign-up-email"
                    type="text"
                    placeholder="email"
                    onChange={this.handleEmail}/>
          </p>
          <p><input id="sign-up-password1"
                    type="password"
                    placeholder="password"
                    onChange={this.handlePassword1}/>
          </p>
          <p><input id="sign-up-password2"
                    type="password"
                    placeholder="password enter again"
                    onChange={this.handlePassword2}/>
          </p>
          <div id="sign-up-error-message">{this.props.state.signUpError.errorMessage}</div>
          <button className="btn btn-primary"
                  id="sign-up-submit"
                  onClick={this.handleSubmit}>Sign Up
          </button>
          <button id="sign-up-cancle"
                  className="btn btn-warning btn-circle"
                  onClick={this.handleClose}>X
          </button>
        </div>
      )
    }
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
          <ul className="inline" id="sign-in-up">
            <li id="log-in-info">Please log in</li>
            <li id="sign-in-link">
              <button className="btn btn-link" onClick={this.handleSignIn}>sign in</button>
            </li>
            <li id="sign-up-link">
              <button className="btn btn-link" onClick={this.handleSignUp}>sign up</button>
            </li>
          </ul>
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

    this.setSignInPanel = () => {
      if (this.props.state.signInDisplay === true) {
        return (<SignIn state={this.props.state} actions={this.props.actions}/>);
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
        {this.setContent()}
        {this.setSignOutButton()}
        {this.setNewPostButton()}
        <div id="user-sign">
          {this.setSignInPanel()}
          {this.setSignUpPanel()}
        </div>
      </div>
    )
  }
}