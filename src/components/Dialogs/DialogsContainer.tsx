import React from 'react'
import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {DialogsPageType, StoreType} from '../../redux/redux-store';
import Dialogs from './Dialogs';

export type DialogsContainerPropsType = {
  store: StoreType
}

const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {
  const state:DialogsPageType = props.store.getState().dialogsPage

  const onSendMessageClick = () => {
    const action = sendMessageCreator()
    props.store.dispatch(action)
  }
  const onNewMessageChange = (text: string) => {
    const action = updateNewMessageTextCreator(text)
    props.store.dispatch(action)
  }
  return <Dialogs dialogsPage={state}
                  updateNewMessageText={onNewMessageChange}
                  sendMessage={onSendMessageClick}
  />
}

export default DialogsContainer
