import React from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';

export type DialogType = {
  id: string
  name: string
}
export type MessagesType = {
  id: string
  message: string
}

export type DialogsPropsType = {
  state: {
    dialogs: DialogType[]
    messages: MessagesType[]
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
