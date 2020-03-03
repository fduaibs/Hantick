import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getSession, sendMessage, sendUserInput, resetProps } from '../actions/chatActions';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.lastChatDivRef = React.createRef();
    }

    componentDidMount() {
        this.props.resetProps();
        this.props.getSession(this.props.auth);
    }

    componentDidUpdate() {
        this.autoScroll()
    }

    reloadChat = () => {
        if(this.inputRef.current) {
            this.inputRef.current.value = '';
            //this.inputRef.current.focus();
        }
        this.props.resetProps();
        this.props.getSession(this.props.auth);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.props.sendMessage(event.target.value, this.props.sessionId, this.props.message.queueIndex);
            event.target.value = '';
            event.target.focus = true;
        } 
    }

    insertMessages = () => {
        let elementList = this.props.chatList.map((message, i) => {
            if(this.props.whoSent[i] === 'bot') {
                return ( 
                    React.createElement('div', { 
                        className: "col s12",
                        key:[i],   
                    }, React.createElement('div',
                    { 
                        className: "col s8",
                        key:[i], 
                        style: {
                            textAlign: "left"
                        }    
                    }, React.createElement('p', {
                        className: "grey darken-4",
                        style: {
                            display:"inline-block",
                            padding: "10px",
                            borderRadius: "10px",
                            textAlign:"center",
                            color: "white",
                        }        
                    }, message))
                    )
                )
            } else if (this.props.whoSent[i] === 'user') {
                return ( 
                    React.createElement('div', { 
                            className: "col s12",
                            key:[i],   
                        }, React.createElement('div',
                        { 
                            className: "col s8 offset-s4",
                            key:[i], 
                            style: {
                                textAlign: "right"
                            }    
                        }, React.createElement('p', {
                            className: "light-green darken-2",
                            style: {
                                display:"inline-block",
                                padding: "10px",
                                borderRadius: "10px",
                                textAlign:"center",
                                color: "white",
                            }        
                        }, message))
                    )
                )
            } else {
                let ticketList = this.props.chatList[i];
                ticketList = ticketList.map((iterable) => {
                    return (
                        React.createElement('button', {
                            className: "grey darken-4 btn-small waves-effect waves-light hoverable",
                            key:[i],
                            style: {
                                display:"inline-block",
                                padding: "10px",
                                borderRadius: '50px',
                                color: 'white',
                                textAlign: 'center',
                                lineHeight: "10px",
                                marginTop: '1rem',
                                marginLeft: '10px',
                            },
                        }, iterable._id)
                    )
                })
                return (
                    React.createElement('div', { 
                            className: 'col s8',
                            key:[i+100],     
                    }, ticketList)  
                )
            }
        })
        return (
            React.createElement('div', {}, [elementList, React.createElement('div', { className: 'col s12', ref: this.lastChatDivRef })])
        )
    }
        
    handleClick = () => {
        this.props.sendMessage(this.inputRef.current.value, this.props.sessionId, this.props.message.queueIndex);
        if(this.inputRef.current) {
            this.inputRef.current.value = '';
            //this.inputRef.current.focus();
        }
    }    

    autoScroll = () => {
        if(this.lastChatDivRef.current) {
            this.lastChatDivRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    render() {
        return(
            <div className="container" style={{ marginTop: "7rem" }}>
                <div className="row">
                    <div className="col s12">
                        <div className="col s10 offset-s1 grey darken-4" style={{ borderRadius: "15px", height: "32rem" }} >
                            <div className="col s12 white" style={{ height: "24rem", overflow: "auto", marginTop: "2rem", borderRadius: "15px" }}>
                                {this.insertMessages()}
                            </div>
                            <div className="col s10 input-field white" style={{ borderRadius: "15px" }}>
                                <input
                                    ref={this.inputRef}
                                    autoFocus={true}
                                        placeholder="Say something..." 
                                    type="text" 
                                    onKeyDown ={this.handleKeyPress}
                                /> 
                            </div>
                            <div className="col s2">
                                <button className="col s11 offset-s1 btn-flat btn-large waves-effect waves-light light-green darken-2" onClick={this.handleClick} style={{ marginTop: "1rem", borderRadius: "15px" }}>
                                        <i className="material-icons white-text">send</i>
                                </button>
                            </div>
                        </div>
                        <div className="col s1" style={{ marginTop: "1rem" }}>
                            <button className="btn-floating btn-small waves-effect waves-light light-green darken-2" onClick={this.reloadChat}>
                                <i className="material-icons white-text">replay</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    getSession: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendUserInput: PropTypes.func.isRequired,
    resetProps: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    sessionId: PropTypes.string,
    message: PropTypes.object.isRequired,
    messageList: PropTypes.array.isRequired,
    inputList: PropTypes.array.isRequired,
    chatList: PropTypes.array.isRequired,
    whoSent: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
    console.log('StateForProps>', state)
    return {
        auth: state.auth,
        chat: {
            sessionLoading: state.chat.sessionLoading,
            messageLoading: state.chat.messageLoading,
        },
        sessionId: state.chat.sessionId,
        message: {
            queueIndex: state.chat.queueIndex,
        },
        messageList: state.chat.messageList,
        inputList: state.chat.inputList,
        chatList: state.chat.chatList,
        whoSent: state.chat.whoSent,
        inputListLength: state.chat.inputListLength,
    }
};

export default connect(mapStateToProps, { getSession, sendMessage, sendUserInput, resetProps })(Chat);