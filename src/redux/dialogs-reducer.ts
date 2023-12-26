import {ActionsTypes, DialogsPageType} from './state';

const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const dialogsReducer = (state: DialogsPageType, action: ActionsTypes): DialogsPageType => {
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