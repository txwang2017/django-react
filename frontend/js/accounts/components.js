import React from 'react';
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
            this.props.actions(this.email, this.password);
        };
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
                    <p id="sign-in-error-message">{this.props.state.signInError.errorMessage}</p>
                    <button id="sign-in-submit" onClick={this.handleSubmit}>Sign In</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
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
            this.props.actions(this.username, this.email, this.password1, this.password2);
        };
    }

    render() {
        if (this.props.state.userInfo.isAuthenticated) {
            return null;
        } else {
            return (
                <div>
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
                    <p id="sign-up-error-message">{this.props.state.signUpError.errorMessage}</p>
                    <button id="sign-up-submit" onClick={this.handleSubmit}>Sign Up</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            )
        }
    }
}

export class Header extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.setContent = () => {
            if (this.props.state.userInfo.isAuthenticated === true) {
                return (
                    <span id="user-info">
                        {this.props.state.userInfo.email}
                    </span>
                );
            } else {
                return (
                    <ul id="sign-in-up">
                        <li>Please log in</li>
                        <li id="sign-in-link"><Link to={this.props.signInPath}>sign in</Link></li>
                        <li id="sign-up-link"><Link to={this.props.signUpPath}>sign up</Link></li>
                    </ul>
                );
            }
        };

        this.setSignOutButton = () => {
            let signOutButton = '';
            if (this.props.state.userInfo.isAuthenticated) {
                signOutButton = <button id="sign-out-submit" onClick={this.props.actions.signOut}>sign out</button>;
            } else {
                signOutButton = null;
            }
            return signOutButton;
        }
    }

    componentWillMount() {
        this.props.actions.checkAuthentication();
    }

    render() {
        return (
            <div id="account-header">
                {this.setContent()}
                {this.setSignOutButton()}
            </div>
        )
    }
}