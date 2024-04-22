import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import s from '../Dialogs.module.css'
import {NewMessageFormValuesType} from "../Dialogs";

const maxLength50 = maxLengthCreator(50)

type NewMessageFormDataKeysType = Extract<keyof NewMessageFormValuesType, string>

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return <form onSubmit={props.handleSubmit} className={s.sendForm}>
        {createField<NewMessageFormDataKeysType>("Enter your message", "newMessageBody", [maxLength50], Textarea)}
        <Field
            component={Textarea}
            name="newMessageBody"
            placeholder="Enter your message"
            validate={[maxLength50]}
        />
        <button>send</button>
    </form>
}

export default reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm)