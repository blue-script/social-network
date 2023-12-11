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

  let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
  let messagesElements = props.state.messages.map(m => <Message message={m.message}/>)
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogsElements}
        </div>
        <div className={s.messages}>
          {messagesElements}
        </div>
      </div>
    </div>
  )
}

export default Dialogs
