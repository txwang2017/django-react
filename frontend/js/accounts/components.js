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
        if (this.props.state.header.userInfo.isAuthenticated) {
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
                    <div id="sign-in-error-message">{this.props.state.account.signInError.errorMessage}</div>
                    <button className="btn btn-primary" id="sign-in-submit" onClick={this.handleSubmit}>Sign In</button>
                    <Link to="/">
                        <button id="sign-in-cancle" className="btn btn-warning btn-circle">
                            X
                        </button>
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
        if (this.props.state.header.userInfo.isAuthenticated) {
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
                    <div id="sign-up-error-message">{this.props.state.account.signUpError.errorMessage}</div>
                    <button className="btn btn-primary" id="sign-up-submit" onClick={this.handleSubmit}>Sign Up</button>
                    <Link to="/">
                        <button id="sign-up-cancle" className="btn btn-warning btn-circle">
                            X
                        </button>
                    </Link>
                </div>
            )
        }
    }
}