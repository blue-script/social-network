import {maxLengthCreator} from "../../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import s from "../MyPosts.module.css";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(100)

export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {

    return <form className={s.formContainer} onSubmit={props.handleSubmit}>
        {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", [maxLength10], Textarea)}
        <button className={s.button}>Add post</button>
    </form>
}
export default reduxForm<AddPostFormValuesType>({form: "profileAddNewPostForm"})(AddPostForm)