import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {Message, MessageType} from './Message/Message';
import {DialogItem, DialogItemType} from './DialogItem/DialogItem';
import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';

export type DialogsPropsType = {
  state: {
    dialogs: DialogItemType[]
    messages: MessageType[]
    newMessageBody: string
  }
  dispatch: (action: any) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
  const messagesElements = props.state.messages.map(m => <Message key={m.id} message={m.message}/>)
  const newMessageBody = props.state.newMessageBody

  const onSendMessageClick = () => {
    const action = sendMessageCreator()
    props.dispatch(action)
  }
  const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const action = updateNewMessageTextCreator(e.target.value)
    props.dispatch(action)
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
