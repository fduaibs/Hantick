import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Landing extends Component {
    
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="container valign-wrapper" style={{ marginTop: "15rem" }}>
                <div className="row">
                    <div className="col s12" style={{ textAlign: "center" }}>
                        <h4>Your ticket-handler <b>chatbot</b>.</h4>
                        <div className="divider grey"/>
                        <div className="col s6">
                            <Link to="/register" 
                            className="btn btn-large waves-effect waves-light hoverable light-green darken-2"
                            style={{ 
                                marginTop: "1rem",
                                borderRadius: "10px",
                                letterSpacing: "1.5px",
                            }}>
                                Sign Up
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link to="/login" 
                            className="btn btn-large btn-flat waves-effect grey lighten-1"
                            style={{
                                marginTop: "1rem",
                                borderRadius: "10px",
                                letterSpacing: "1.5px"
                            }}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
)(Landing);