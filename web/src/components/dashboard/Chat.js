import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getSession, sendMessage, sendUserInput } from '../../actions/chatActions';

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSession();
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            console.log('input>', event.target.value)
            console.log(this.props.message.queueIndex)
            this.props.sendMessage(event.target.value, this.props.sessionId, this.props.message.queueIndex);
            event.target.value = '';
            event.target.focus = true;
        }
    }

    insertMessages = () => {
        let pList = this.props.chatList.map((message, i) => { 
            return (
                React.createElement(
                    'p',
                    { 
                        className: "col s12",
                        key:[i], 
                        style: {
                            textAlign:"center",
                            color: "white",
                            backgroundColor: "blue",
                            borderRadius: "10px"
                        }    
                    },
                    message
                )
            )
        })
        return (
            React.createElement('div', {}, pList)
        )
    }
        
    handleClick = () => {
    }    

    render() {
        console.log('props>', this.props)
        return(
            <div className="container">
                <div className="row">
                    <div id="chatArea" className="col s8 offset-s2" style={{ backgroundColor: "lightgrey", marginTop: "2rem", borderRadius: "15px" }} >
                        <div id="messageArea" className="col s12" style={{ overflow: "auto", height: "350px", backgroundColor: "white", marginTop: "2rem", borderRadius: "15px" }}>
                            {this.insertMessages()}
                        </div>
                        <div className="input-field col s12" style={{backgroundColor: "white", borderRadius: "15px"}}>
                            <input 
                                id="chatInput" 
                                className="col s10" 
                                autoFocus placeholder="Say something..." 
                                type="text" 
                                onKeyPress = {this.handleKeyPress}
                            />
                            <button type="submit" className="btn-flat col s2 waves-effect waves-light" onClick={this.handleClick} style={{marginTop: "10px"}}>
                                <i className="material-icons">send</i>
                            </button>
                            <label htmlFor="chatInput" className="col s12"></label> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    console.log('StateForProps>', state.chat)
    return {
        chat: {
            isAuthenticated: state.chat.isAuthenticated,
            sessionLoading: state.chat.sessionLoading,
            messageLoading: state.chat.messageLoading,
        },
        sessionId: state.chat.sessionId,
        message: {
            text: state.chat.message,
            type: state.chat.type,
            queueIndex: state.chat.queueIndex,
        },
        messageList: state.chat.messageList,
        inputList: state.chat.inputList,
        chatList: state.chat.chatList,
    }
};

export default connect(mapStateToProps, { getSession, sendMessage, sendUserInput })(Chat);