import React, {ChangeEvent, useRef, useState} from "react"
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultPhoto from "../../../assets/images/defaultUserPhoto.png"
import ProfileDataForm, {ProfileDataFormProps} from "./ProfileDataForm";
import check from "../../../assets/images/checked.png"
import downloadIcon from "../../../assets/images/download_icon.png"
import {ContactsType, ProfileRequestType} from "../../../api/profile-api";

type Props = {
    profile: ProfileRequestType | null,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: <T>(profile: Partial<ProfileRequestType>) => Promise<T>
}

const ProfileInfo: React.FC<Props> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: ProfileDataFormProps) => {
        // todo: remove then
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click()
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                {isOwner
                    ? <>
                        <div onClick={selectFileHandler} className={s.imgContainer}>
                            <img className={`${s.mainPhoto} ${s.ownerMainPhoto}`}
                                 src={profile.photos.large || defaultPhoto} alt="photo user"/>
                            <img className={s.downloadIcon} src={downloadIcon} alt="downloadIcon"/>
                        </div>
                        <input className={s.uploader}
                               type="file"
                               onChange={uploadHandler}
                               accept="image/*"
                               ref={inputRef}
                        />
                    </>
                    : <img className={s.mainPhoto}
                           src={profile.photos.large || defaultPhoto}
                           alt="photo user"/>
                }

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
    profile: ProfileRequestType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataProps> = ({profile, isOwner, goToEditMode}) => {
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
                                contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    )
}

type ContactsProps = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactsProps> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo

