import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import s from '../Dialogs.module.css'

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit} className={s.sendForm}>
        <Field
            component={Textarea}
            name="newMessageBody"
            placeholder="Enter your message"
            validate={[maxLength50]}
        />
        <button>send</button>
    </form>
}

export default reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

//types
export type FormDataType = {
    newMessageBody: string
}