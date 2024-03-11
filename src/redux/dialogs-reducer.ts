import {StoreActionsTypes} from './redux-store';


const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id?: number
  message: string
}
export type DialogsPageType = {
  dialogs: DialogType[]
  messages: MessageType[]
  newMessageBody: string
}

const initialState: DialogsPageType = {
  dialogs: [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Valera'},
    {id: 3, name: 'Sasha'},
    {id: 4, name: 'Petia'},
    {id: 5, name: 'Masha'},
  ] as DialogType[],
    messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Fine, bro'},
  ] as MessageType[],
    newMessageBody: '',
}

const dialogsReducer = (state: DialogsPageType = initialState, action: StoreActionsTypes): DialogsPageType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        newMessageBody: '',
        messages: [
          ...state.messages,
          {id: state.messages.length + 1, message: state.newMessageBody}
        ]
      }
    case UPDATE_NEW_MESSAGE_BODY:
      return {...state, newMessageBody: action.body}
    default:
      return state
  }
}

export const sendMessageCreator = () =>
  ({type: 'SEND-MESSAGE'}) as const
export const updateNewMessageTextCreator = (body: string) =>
  ({type: 'UPDATE-NEW-MESSAGE-BODY', body: body}) as const
export default dialogsReducer