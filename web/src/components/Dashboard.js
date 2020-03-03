import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container valign-wrapper" style={{ marginTop: "15rem" }}>
                <div className="row">
                    <div className="col s12" style={{ textAlign: "center" }}>
                        <div className="col s12">
                            <h4>
                                <b> Hey there,</b> {user.name.split(" ")[0]}!
                            </h4>
                            <div className="divider grey"/>
                            <Link to="/chat" style={{  
                                    borderRadius: "10px",
                                    letterSpacing: "1.5px",
                                    marginTop: '1rem'
                                }}
                                className="btn-large waves-effect waves-light hoverable light-green darken-2">
                                    Talk with Hantick
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { }
)(Dashboard);