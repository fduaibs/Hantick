import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    onAuthenticatedRender = () => {
        if(this.props.auth.isAuthenticated) {
            return (
                <li>
                    <Link to="#" onClick={this.onLogoutClick}>
                        <i className="material-icons">exit_to_app</i>
                    </Link>
                </li>
            )
        }
    }

    render() {
        return (
            <div className="" style={{height: 0}}>
                <nav>
                    <div className="nav-wrapper grey darken-4 z-depth-2">
                    <ul id="nav-mobile" className="right">
                        {this.onAuthenticatedRender()}
                    </ul>
                    <Link to="/" style={{ fontFamily: "monospace" }} className="brand-logo center white-text">
                        <i className="material-icons">child_care</i>
                        HANTICK
                    </Link>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);