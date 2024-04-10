import React, {ChangeEvent, useRef, useState} from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer"
import Preloader from "../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultPhoto from "../../../assets/images/defaultUserPhoto.png"
import ProfileDataForm, {ProfileDataFormProps} from "./ProfileDataForm";
import {ProfileRequestType} from "../../../api/api";
import check from "../../../assets/images/checked.png"
import cn from "classnames";

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
    const inputRef = useRef<HTMLInputElement>(null)

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: ProfileDataFormProps) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click()
    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                <img onClick={selectFileHandler} className={cn(s.mainPhoto, {[s.ownerMainPhoto]: isOwner})}
                     src={profile.photos.large || defaultPhoto} alt="photo user"/>
                {isOwner && <>
                    <input className={s.uploader}
                           type="file"
                           onChange={uploadHandler}
                           accept="image/*"
                           ref={inputRef}
                    />
                </>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

            <div className={s.profileDataContainer}>
                <h3 className={s.title}>Personal Information</h3>
                {editMode
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
                <button className={s.button} onClick={goToEditMode}>edit</button>
            </div>}
            <div>
                <img className={s.check} src={check} alt="check"/>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <img className={s.check} src={check} alt="check"/>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <img className={s.check} src={check} alt="check"/>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>}
            <div>
                <img className={s.check} src={check} alt="check"/>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <img className={s.check} src={check} alt="check"/>
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

