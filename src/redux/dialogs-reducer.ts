import {StoreActionsTypes} from './redux-store';
import {DialogsPageType} from "../types/types";

const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Petia'},
        {id: 5, name: 'Masha'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Fine, bro'},
    ]
}

const dialogsReducer = (state: DialogsPageType = initialState, action: StoreActionsTypes): DialogsPageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: state.messages.length + 1, message: action.newMessageBody}
                ]
            }
        default:
            return state
    }
}

export type SendMessageCreatorActionType = ReturnType<typeof sendMessageCreator>
export const sendMessageCreator = (newMessageBody: string) =>
    ({type: 'SEND-MESSAGE', newMessageBody}) as const

export default dialogsReducer

