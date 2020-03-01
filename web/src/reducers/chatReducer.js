import { GET_SESSION, SEND_MESSAGE, USER_INPUT, BEFORE_TICKETS, AFTER_TICKETS, AFTER_DONE, AFTER_DONE_CREATE } from '../actions/types';

const initialState = {
    sessionLoading: true,
    sessionId: null,
    messageLoading: true,
    message: {
        text: null,
        type: null,
    },
    messageList: [],
    inputList: [],
    chatList: [],
    whoSent: [],
    responseQueue: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SESSION:
            return { 
                ...state, 
                sessionId: action.payload.session_id,
                message: action.payload.response.text,
                queueIndex: state.responseQueue.length+1,
                type: action.payload.response.response_type,
                sessionLoading: false,
                messageList: [...state.messageList, action.payload.response.text],
                chatList: [...state.chatList, action.payload.response.text],
                whoSent: state.whoSent.concat('bot'),
                responseQueue: [...state.responseQueue, 0],
            }
        case SEND_MESSAGE:
            const sliceIn = state.responseQueue[action.payload.queueIndex]; 
            const chatListPrev = state.chatList.slice(0, sliceIn);
            const whoSentPrev = state.whoSent.slice(0, sliceIn);
            const chatListAfter = state.chatList.slice(sliceIn+1, state.chatList.length);
            const whoSentAfter = state.whoSent.slice(sliceIn+1, state.chatList.length);
            const delayedResponses = action.payload.response.output.generic.map((messageObj) => {return (messageObj.text)});  
            const delayedWhoSent = action.payload.response.output.generic.map(() => {return ('bot')});

            state.responseQueue = state.responseQueue.map((x) => {return (x+action.payload.response.output.generic.length-1)});

            return { 
                ...state, 
                message: action.payload.response.output.generic.text,
                type: action.payload.response.output.generic.response_type,
                messageLoading: false,
                messageList: [...state.messageList, delayedResponses],
                chatList: chatListPrev.concat(delayedResponses, chatListAfter),
                whoSent: whoSentPrev.concat(delayedWhoSent, whoSentAfter),
            }
        case USER_INPUT: {
            return {
                ...state,
                message: action.payload.response.text,
                type: action.payload.response.response_type,
                messageLoading: true,
                inputList: [...state.inputList, action.payload.input],
                chatList: state.chatList.concat(action.payload.input, action.payload.response.text),
                whoSent: state.whoSent.concat('user', 'bot'),
                responseQueue: [...state.responseQueue, state.chatList.length+1],
                queueIndex: state.responseQueue.length+1,
            }
        }
        case BEFORE_TICKETS: {
            const whereToPut = state.responseQueue[action.payload.queueIndex]
            state.chatList[whereToPut] = 'Waiting DB...';
            return {
                ...state,
                message: 'Waiting BD...',
                type: 'waiting_bd',
                chatList: state.chatList,
            }
        }
        case AFTER_TICKETS: {
            const sliceIn = state.responseQueue[action.payload.queueIndex]; 
            const chatListPrev = state.chatList.slice(0, sliceIn);
            const whoSentPrev = state.whoSent.slice(0, sliceIn);
            const chatListAfter = state.chatList.slice(sliceIn+1, state.chatList.length);
            const whoSentAfter = state.whoSent.slice(sliceIn+1, state.whoSent.length);

            const delayedWhoSent = action.payload.response.tickets.map(() => {return ('bd')});

            // const responseQueuePrev = state.responseQueue.slice(0, action.payload.queueIndex+1);
            // let responseQueueAfter = state.responseQueue.slice(action.payload.queueIndex+1, state.responseQueue.length);
            
            // responseQueueAfter = responseQueueAfter.map((x) => {return(x+1)})
            // const newResponseQueue = responseQueuePrev.concat(state.responseQueue[action.payload.queueIndex]+1, responseQueueAfter);

            return {
                ...state,
                chatList: chatListPrev.concat(action.payload.response.tickets, chatListAfter),
                whoSent: whoSentPrev.concat(delayedWhoSent, whoSentAfter),
                // responseQueue: newResponseQueue,
                // queueIndex: state.queueIndex+1,
            }
            
        }
        case AFTER_DONE: { 
            return {
                ...state,
                chatList: [...state.chatList, action.payload.response.output.generic[0].text],
                whoSent: [...state.whoSent, 'bot'],
            }
        }
        case AFTER_DONE_CREATE: {
            const sliceIn = state.responseQueue[action.payload.queueIndex]; 
            const chatListPrev = state.chatList.slice(0, sliceIn);
            const whoSentPrev = state.whoSent.slice(0, sliceIn);
            const chatListAfter = state.chatList.slice(sliceIn+1, state.chatList.length);
            const whoSentAfter = state.whoSent.slice(sliceIn+1, state.whoSent.length);

            return {
                ...state,
                chatList: chatListPrev.concat(action.payload.response.output.generic[0].text, chatListAfter),
                whoSent: whoSentPrev.concat('bot', whoSentAfter),
                // responseQueue: newResponseQueue,
                // queueIndex: state.queueIndex+1,
            }
        }
        default:
            return state;
    }
}