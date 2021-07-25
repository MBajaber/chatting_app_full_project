import * as actionsType from '../actions/actionsType';

const initialState = {
    user: null,
    allUsers: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionsType.GET_USER_DETAILS:
            return {...state, user: action.data}
        case actionsType.EMPTY_USER:
            return {...state, user: null}
        case actionsType.GET_ALL_USERS:
            let users = state.user ? action.users.filter(el => el.uid !== state.user.uid) : [];
            return {...state, allUsers: users}
        case actionsType.EMPTY_ALL_USERS:
            return {...state, allUsers: []}
        default:
            return {...state}
    }
}

export default userReducer;