import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'

type DialogItemPropsType = {
  name: string
  id: string
}
const DialogItem: React.FC<DialogItemPropsType> = ({name, id}) => {
  const path = '/dialogs/' + id
  return (
    <div className={s.dialog + ' ' + s.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}

type MessagePropsType = {
  message: string
}
const Message: React.FC<MessagePropsType> = ({message}) => {
  return <div className={s.message}>{message}</div>
}

type dialogDataType = {
	id: string
	name: string
}
type MessagesType = {
	id: string
	message: string
}
const Dialogs = () => {
  let dialogsData: dialogDataType[] = [
    {id: '1', name: 'Dimych'},
    {id: '2', name: 'Valera'},
    {id: '3', name: 'Sasha'},
    {id: '4', name: 'Petia'},
    {id: '5', name: 'Masha'},
  ]
  let messages: MessagesType[] = [
    {id: '1', message: 'Hi'},
    {id: '2', message: 'How are you?'},
    {id: '3', message: 'Yo'},
  ]

	let dialogsElements = dialogsData.map( d => <DialogItem name={d.name} id={d.id}/>)
	let messagesElements = messages.map(m=> <Message message={m.message}/>)
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
