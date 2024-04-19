import {InferActionsType} from './redux-store';

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

const dialogsReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
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

export const dialogsActions = {
    sendMessageCreator: (newMessageBody: string) =>
        ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody}) as const
}

export default dialogsReducer

type InitialStateType = typeof initialState
export type DialogsActionsType = InferActionsType<typeof dialogsActions>