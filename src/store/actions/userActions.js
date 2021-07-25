import * as actionsType from '../actions/actionsType';

export const getUserDetails = (data) => ({ type: actionsType.GET_USER_DETAILS, data: data });
export const emptyUser = () => ({ type: actionsType.EMPTY_USER });
export const getAllUsers = (users) => ({ type: actionsType.GET_ALL_USERS, users: users });
export const emptyAllUsers = () => ({ type: actionsType.EMPTY_ALL_USERS });