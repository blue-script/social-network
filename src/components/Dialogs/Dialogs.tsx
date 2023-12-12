import React from 'react'
import s from './Dialogs.module.css'
import {Message, MessageType} from './Message/Message';
import {DialogItem, DialogItemType} from './DialogItem/DialogItem';

export type DialogsPropsType = {
  state: {
    dialogs: DialogItemType[]
    messages: MessageType[]
  }
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
  const messagesElements = props.state.messages.map(m => <Message message={m.message}/>)
  const newMessageElement = React.createRef<HTMLTextAreaElement>()
  const addMessage = () => {
    if (newMessageElement.current) {
      const message = newMessageElement.current.value
      alert(message)
    }
  }
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogsElements}
        </div>
        <div className={s.messages}>
          {messagesElements}
          <textarea ref={newMessageElement}>New message</textarea>
          <button onClick={addMessage}>add message</button>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
