import React from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogsPropsType} from './DialogsContainer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (formData: { newMessageBody: string }) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>

                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

export const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component="textarea" name="newMessageBody" placeholder="Enter your message"/>
        </div>
        <div>
            <button>send</button>
        </div>
    </form>
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs

//types
type FormDataType = {
    newMessageBody: string
}