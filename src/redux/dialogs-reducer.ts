import {ActionsTypes, DialogsPageType} from './store';

const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const initialState = {
  dialogs: [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Valera'},
    {id: 3, name: 'Sasha'},
    {id: 4, name: 'Petia'},
    {id: 5, name: 'Masha'},
  ],
    messages:
  [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Fine, bro'},
  ],
    newMessageBody: '',
}
const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {
  switch (action.type) {
    case SEND_MESSAGE:
      state.messages.push({id: state.messages.length + 1, message: state.newMessageBody})
      state.newMessageBody = ''
      return state
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body
      return state
    default:
      return state
  }
}

export const sendMessageCreator = () =>
  ({type: 'SEND-MESSAGE'}) as const
export const updateNewMessageTextCreator = (body: string) =>
  ({type: 'UPDATE-NEW-MESSAGE-BODY', body: body}) as const
export default dialogsReducer