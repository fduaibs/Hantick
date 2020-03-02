import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Landing extends Component {
    
    componentDidMount() {
        console.log(this.props)
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            Your ticket-handler <b>chatbot</b>
                        </h4>
                        <div className="divider"/>
                        <p/>
                        <div className="col s6">
                            <Link to="/register" style={{  
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Sign Up
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link to="/login" style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                             }}
                             className="btn btn-large btn-flat waves-effect white black-text">
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