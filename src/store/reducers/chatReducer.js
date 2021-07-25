import * as actionsType from '../actions/actionsType';

const initialState = {
    startChat: false,
    friendInfo: {
        friendId: '',
        friendName: '',
        friendImage: '',
    },
    allMessages: [],
    IsScreenSmallSize: false,
    openChat: false
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionsType.START_CHAT:
            return {
                ...state,
                startChat: true,
                friendInfo:{
                    friendId: action.friendData.id,
                    friendName: action.friendData.name,
                    friendImage: action.friendData.image
                }
            }
        case actionsType.GET_ALL_MESSAGES:
            return {...state, allMessages: action.allMsg}
        case actionsType.IS_SCREEN_SMALL_SIZE:
            let getValue = typeof(action.value) === 'boolean' ? action.value : action.value < 500;
            return {...state, IsScreenSmallSize: getValue}
        case actionsType.OPEN_CHAT:
            return {...state, openChat: action.value}
        case actionsType.RESET_CHAT_SETTING:
            return {
                ...state,
                startChat: false,
                friendInfo: {
                    friendId: '',
                    friendName: '',
                    friendImage: '',
                },
                allMessages: [],
                IsScreenSmallSize: false,
                openChat: false
            }
        default:
            return {...state}
    }
}

export default chatReducer;