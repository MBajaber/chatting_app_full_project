import * as actionsType from '../actions/actionsType';

export const startChat = (friendData) => ({ type: actionsType.START_CHAT, friendData });
export const getAllMessages = (allMsg) => ({ type: actionsType.GET_ALL_MESSAGES, allMsg });
export const isScreenSmallSize = (boolean) => ({ type: actionsType.IS_SCREEN_SMALL_SIZE, value: boolean });
export const openChat = (boolean) => ({ type: actionsType.OPEN_CHAT, value: boolean });
export const resetChatSetting = () => ({ type: actionsType.RESET_CHAT_SETTING });
