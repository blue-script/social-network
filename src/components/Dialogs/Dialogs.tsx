import React from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogsProps} from './DialogsContainer';
import AddMessageForm from "./AddMessageForm/AddMessageForm";

export type NewMessageFormValuesType = {
    newMessageBody: string
}


const Dialogs: React.FC<DialogsProps> = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (formData: { newMessageBody: string }) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={s.container}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                    <AddMessageForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs

