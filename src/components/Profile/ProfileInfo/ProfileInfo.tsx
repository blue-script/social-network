import React from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer"
import Preloader from "../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultPhoto from "../../../assets/images/defaultUserPhoto.png"

const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                { profile.photos.large
                    ? <img src={profile.photos.large} alt="photo user"/>
                    : <img src={defaultPhoto} alt="photo user"/>
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo

// types
type ProfileInfoType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void
}