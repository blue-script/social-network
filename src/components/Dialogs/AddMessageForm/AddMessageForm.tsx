import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {FormControl} from "../../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={FormControl}
                type='textarea'
                name="newMessageBody"
                placeholder="Enter your message"
                validate={[required, maxLength50]}
            />
        </div>
        <div>
            <button>send</button>
        </div>
    </form>
}

export default reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

//types
export type FormDataType = {
    newMessageBody: string
}