import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

type DialogItemPropsType = {
	name: string
	id: string
}
const DialogItem: React.FC<DialogItemPropsType> = ({ name, id }) => {
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

const Dialogs = () => {
	return (
		<div>
			<div className={s.dialogs}>
				<div className={s.dialogsItems}>
					<DialogItem name='Dimych' id='1' />
					<DialogItem name='Valera' id='2' />
					<DialogItem name='Sasha' id='3' />
					<DialogItem name='Petia' id='4' />
					<DialogItem name='Masha' id='5' />
				</div>
				<div className={s.messages}>
          <Message message='Hi'/>
          <Message message='How are you?'/>
          <Message message='Yo'/>
				</div>
			</div>
		</div>
	)
}

export default Dialogs
