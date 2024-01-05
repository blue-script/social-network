import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogsPageType} from '../../redux/redux-store';

export type DialogsPropsType = {
  dialogsPage: DialogsPageType
  updateNewMessageText: (text: string) => void
  sendMessage: () => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
  const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)
  const newMessageBody = props.dialogsPage.newMessageBody

  const onSendMessageClick = () => {
    props.sendMessage()
  }
  const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewMessageText(e.currentTarget.value)
  }
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogsElements}
        </div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
          <div>
            <div>
              <textarea value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'>
              </textarea>
            </div>
            <div>
              <button onClick={onSendMessageClick}>send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
