import React from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';

export type dialogType = {
  id: string
  name: string
}
export type MessagesType = {
  id: string
  message: string
}

export type DialogsPropsType = {
  dialogs: dialogType[]
  messages: MessagesType[]
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

  let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
  let messagesElements = props.messages.map(m => <Message message={m.message}/>)
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
