import React, {ChangeEvent, useState} from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer"
import Preloader from "../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultPhoto from "../../../assets/images/defaultUserPhoto.png"
import ProfileDataForm, {ProfileDataFormProps} from "./ProfileDataForm";
import {ProfileRequestType} from "../../../api/api";

type Props = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: <T>(profile: Partial<ProfileRequestType>) => Promise<T>
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileDataFormProps) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} src={profile.photos.large || defaultPhoto} alt="photo user"/>
                {isOwner && <>
                    <label htmlFor="files" className={s.lableUploader}>Select Photo</label>
                    <input id="files"
                           className={s.uploader}
                           type="file"
                           onChange={onMainPhotoSelected}
                           accept="image/*"
                    />
                </>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

            <div className={s.profileDataContainer}>{editMode
                ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }}/>
            }</div>
        </div>
    )
}

type ProfileDataProps = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataProps) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>}
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map((key: string) => {
                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof typeof profile.contacts]}/>
            })}
            </div>
        </div>
    )
}

type ContactProps = {
    contactTitle: string
    contactValue: string
}

export const Contact = ({contactTitle, contactValue}: ContactProps) => {
    return <div className={s.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo

