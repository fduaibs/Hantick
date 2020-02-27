import { GET_SESSION, SEND_MESSAGE, USER_INPUT } from '../actions/types';

const initialState = {
    isAuthenticated: true,
    sessionLoading: true,
    messageLoading: false,
    inputList: [],
    messageList: [],
    chatList: [],
    chat: {
        isAuthenticated: true,
        sessionLoading: true,
        messageLoading: true,
    },
    sessionId: null,
    message: {
        text: null,
        type: null,
    },
    messageList: [],
    inputList: [],
    chatList: [],
    responseQueue: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SESSION:
            console.log("actionpayloadsession", action.payload)
            return { 
                ...state, 
                sessionId: action.payload.session_id,
                message: action.payload.response.text,
                type: action.payload.response.response_type,
                sessionLoading: false,
                messageList: [...state.messageList, action.payload.response.text],
                chatList: [...state.chatList, action.payload.response.text],
                responseQueue: [...state.responseQueue, 0],
                queueIndex: state.responseQueue.length+1,
            }
        case SEND_MESSAGE:
            console.log('send message state -> ', state)
            console.log("sebd message action.payload ->", action.payload)
            const sliceIn = state.responseQueue[action.payload.queueIndex]; //Cortar o array onde estiver "loading..."
            const chatListPrev = state.chatList.slice(0, sliceIn)
            const chatListAfter = state.chatList.slice(sliceIn+1, state.chatList.length)
            state.responseQueue = state.responseQueue.map((x) => {return (x+action.payload.response.length-1)});
            const responses = action.payload.response.map((messageObj) => {return (messageObj.text)})
            return { 
                ...state, 
                message: action.payload.response.text,
                type: action.payload.response_type,
                messageLoading: false,
                messageList: [...state.messageList, responses],
                chatList: chatListPrev.concat(responses, chatListAfter)
            }
        case USER_INPUT: {
            console.log("payload input>>", action.payload);
            return {
                ...state,
                message: action.payload.response.text,
                type: action.payload.response.response_type,
                messageLoading: true,
                inputList: [...state.inputList, action.payload.input],
                chatList: state.chatList.concat(action.payload.input, action.payload.response.text),
                responseQueue: [...state.responseQueue, state.chatList.length+1],
                queueIndex: state.responseQueue.length+1,
            }
        }
        default:
            return state;
    }
}