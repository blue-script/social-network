import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {Message, MessageType} from './Message/Message';
import {DialogItem, DialogItemType} from './DialogItem/DialogItem';

export type DialogsPropsType = {
  state: {
    dialogs: DialogItemType[]
    messages: MessageType[]
    newMessage: string
  }
  sendMessage: () => void
  updateNewMessageText: (messageText: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
  const messagesElements = props.state.messages.map(m => <Message key={m.id} message={m.message}/>)
  const sendMessageHandler = () => {
    props.sendMessage()
  }
  const messageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) props.updateNewMessageText(e.currentTarget.value)
  }

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogsElements}
        </div>
        <div className={s.messages}>
          {messagesElements}
          <textarea value={props.state.newMessage}
                    onChange={messageChangeHandler}
          >New message</textarea>
          <button onClick={sendMessageHandler} >add message</button>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
