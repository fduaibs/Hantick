import axios from 'axios';
import { GET_SESSION, SEND_MESSAGE, USER_INPUT, BEFORE_TICKETS, AFTER_TICKETS, AFTER_DONE, AFTER_DONE_CREATE, RESET_PROPS } from './types';

export const getSession = (auth) => dispatch => {
    axios.post('/chat/sessions', {}).then(res => {
        const sessionId = res.data.session_id;
        const userId = auth.user.id;
        const userName = auth.user.name.split(" ");

        axios.post("/chat/messages", { 
            sessionId: sessionId, 
            input: {
                text: "",
                options: {
                    return_context: true,
                },
            },
            context: {
                skills: {
                    'main skill': {
                        user_defined: {
                            user_id: userId,
                            user_name: userName[0],
                        }
                    } 
                }
            }
        }).then(res => {
            dispatch(composeGetSession(sessionId, res.data.output.generic[0]));
        })
    })
}

export const composeGetSession = (session, response) => {
    return {
        type: GET_SESSION,
        payload: { 
            session_id: session,
            response: response,
        }
    }
}

export const sendMessage = (message, sessionId, queueIndex) => dispatch => {
    dispatch(composeUserInput(message));
    axios.post("/chat/messages", { 
        sessionId: sessionId, 
        input: {
            text: message,
            options: {
                return_context: true,
            },
        },
    }).then(res => {
        console.log('SEND MESSAGE RES->', res)
        dispatch(composeSendMessage(message, res.data, queueIndex));
        if(res.data.context.skills['main skill'].user_defined.search_tickets) {
            if(res.data.output.generic[1]) {
                if(res.data.output.generic[1].response_type === 'pause') {
                    dispatch(beforeTickets(queueIndex))
                    axios.get('/tickets', { 
                        params: {
                            user_id: res.data.context.skills['main skill'].user_defined.user_id,
                        }
                    }).then(res => {
                        dispatch(afterTickets(res.data, queueIndex))
                        axios.post('/chat/messages', {
                            sessionId: sessionId,
                            input: {
                                text: 'Done.',
                                options: {
                                    return_context: true,
                                }
                            }
                        }).then(res => {
                            dispatch(afterDone(res.data, queueIndex))
                        }).catch()
                    }).catch()
                }
            }
        }
        if(res.data.context.skills['main skill'].user_defined.create_tickets) {
            if(res.data.output.generic[1]) {
                if(res.data.output.generic[1].response_type === 'pause') {
                    dispatch(beforeTickets(queueIndex));
                    axios.post('/tickets', { 
                        user_id: res.data.context.skills['main skill'].user_defined.user_id,
                        subject: res.data.context.skills['main skill'].user_defined.ticket_subject,
                        description: res.data.context.skills['main skill'].user_defined.ticket_description,
                    }).then(res => {
                        console.log("save ticket res", res)
                        axios.post('/chat/messages', {
                            sessionId: sessionId,
                            input: {
                                text: 'Done.',
                                options: {
                                    return_context: true,
                                }
                            }
                        }).then(res => {
                            dispatch(afterDoneCreate(res.data, queueIndex))
                        }).catch()
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        }
        // if(res.data.context.skills['main skill'].user_defined.search_tickets) {
        
        // }
    })
}

export const composeSendMessage = (message, responseMessage, queueIndex) => {
    return {
        type: SEND_MESSAGE,
        payload: {
            input: message,
            response: responseMessage,
            queueIndex: queueIndex,
        }
    }
}

export const sendUserInput = (input) => dispatch => {
    dispatch(composeUserInput(input))
}

export const composeUserInput = (message) => {
    return {
        type: USER_INPUT,
        payload: {
            input: message,
            response: {
                text: 'Loading...',
                response_type: 'message_loading',
            },
        }
    }
}

export const beforeTickets = (queueIndex) => {
    return {
        type: BEFORE_TICKETS,
        payload: {
            queueIndex: queueIndex
        }
    }
}

export const afterTickets = (responseMessage, queueIndex) => {
    return {
        type: AFTER_TICKETS,
        payload: {
            response: responseMessage,
            queueIndex: queueIndex,
        }
    }
}

export const afterDone = (responseMessage, queueIndex) => {
    return {
        type: AFTER_DONE,
        payload: {
            response: responseMessage,
            queueIndex: queueIndex,
        }
    }
}

export const afterDoneCreate = (responseMessage, queueIndex) => {
    return {
        type: AFTER_DONE_CREATE,
        payload: {
            response: responseMessage,
            queueIndex: queueIndex,
        }
    }
}

export const resetProps = () => {
    return {
        type: RESET_PROPS,
    }
}