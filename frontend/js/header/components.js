import React from "react";
import {Link} from 'react-router-dom';

export class HeaderBar extends React.Component {
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
                    <ul className="inline" id="sign-in-up">
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
                signOutButton = <button className="btn btn-link" id="sign-out-submit" onClick={this.props.actions.signOut}>sign out</button>;
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