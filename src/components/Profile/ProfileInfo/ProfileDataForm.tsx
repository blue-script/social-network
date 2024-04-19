import React, {FC} from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css"
import styles from "../../common/FormsControls/FormsControls.module.css";
import {ProfileRequestType} from "../../../api/profile-api";

export type ProfileDataFormProps = {
    fullname: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
};

type Props = {
    profile: ProfileRequestType
}

const ProfileDataForm: FC<InjectedFormProps<ProfileDataFormProps, Props> & Props> = (
    {
        handleSubmit,
        initialValues,
        profile,
        error,
        ...restProps
    }
) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button className={s.button}>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map((key: string) => {
                return <div key={key} className={s.contact}>
                    <b>{key}:</b> {createField(key, "contacts." + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileDataFormProps, Props>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm