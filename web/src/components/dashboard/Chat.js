import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getSession, sendMessage, sendUserInput, resetProps } from '../../actions/chatActions';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.props.resetProps();
        this.props.getSession(this.props.auth);
    }

    reloadChat = () => {
        this.inputRef.current.value = '';
        this.inputRef.current.focus();
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
                        key:[i+600],   
                    }, React.createElement('div',
                    { 
                        className: "col s8",
                        key:[i+500], 
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
                            key:[i+400],   
                        }, React.createElement('div',
                        { 
                            className: "col s8 offset-s4",
                            key:[i+300], 
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
                            key:[i+200],
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
            React.createElement('div', {}, elementList)
        )
    }
        
    handleClick = () => {
        this.props.sendMessage(this.inputRef.current.value, this.props.sessionId, this.props.message.queueIndex);
        this.inputRef.current.value = '';
        this.inputRef.current.focus();
    }    

    autoScroll = () => {
        if(this.divRef) {
        }
    }

    render() {
        return(
            <div className="container">
                {/* <div style={{ height: "100vh" }} className="valign-wrapper"> */}
                    <div className="row">
                        <div className="s12" style={{ textAlign: "center" }}>
                            <div id="chatArea" className="col s8 offset-s2 grey darken-4" style={{ marginTop: "7rem", borderRadius: "15px" }} >
                                <div id="messageArea" className="col s12" style={{ overflow: "auto", height: "350px", backgroundColor: "white", marginTop: "2rem", borderRadius: "15px"}}>
                                    {this.insertMessages()}
                                    <div ref={this.divRef}/>
                                    {this.autoScroll()}
                                </div>
                                <div className="input-field col s9" style={{backgroundColor: "white", borderRadius: "15px"}}>
                                    <input
                                        ref={this.inputRef}
                                        className="col s12 materialize-textarea"
                                        autoFocus={true}
                                         placeholder="Say something..." 
                                        type="text" 
                                        onKeyDown ={this.handleKeyPress}
                                        style={{ label: { color: "red" } }}
                                    /> 
                                </div>
                                <div className="col s3">
                                    <button type="submit" className="col s10 offset-s1 btn-flat btn-large waves-effect waves-light  light-green darken-2" onClick={this.handleClick} style={{marginTop: "14px", borderRadius: "15%"}}>
                                            <i className="material-icons" style={{ color: "white" }}>send</i>
                                    </button>
                                </div>
                            </div>
                            <div className="col s1" style={{textAlign:'left', marginTop:'8rem'}}>
                                <button type="submit" className="btn-floating btn-small waves-effect waves-light  light-green darken-2" onClick={this.reloadChat}>
                                    <i className="material-icons" style={{ color: "white" }}>replay</i>
                                </button>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
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
    sessionId: PropTypes.string.isRequired,
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