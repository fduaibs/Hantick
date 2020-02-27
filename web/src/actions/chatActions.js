import axios from 'axios';
import { GET_SESSION, SEND_MESSAGE, USER_INPUT } from './types';

const assistantId = '8b1d1595-e3ee-4eee-b300-17b23bf414d2';

export const getSession = () => dispatch => {
    axios.post('/chat/session', {}).then(res => {
        const session = res.data.session_id;
        axios.post("/chat/message", { assistantId: assistantId, sessionId: session, text: "" }).then(res => {
            dispatch(composeGetSession(session, res.data));
        })
    })
}

export const composeGetSession = (session, response) => {
    return {
        type: GET_SESSION,
        payload: { 
            session_id: session,
            response: response[0] //sei que vai ser sempre uma resposta, sem problemas passar em [0]
        }
    }
}

export const sendMessage = (message, session, queueIndex) => dispatch => {
    dispatch(composeUserInput(message));
    axios.post("/chat/message", { assistantId: assistantId, sessionId: session, text: message }).then(res => {
        dispatch(composeSendMessage(message, res.data, queueIndex));
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

