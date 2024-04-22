import React from "react"
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ProfileRequestType} from "../../api/profile-api";

type Props = {
    profile: ProfileRequestType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: <T>(profile: Partial<ProfileRequestType>) => Promise<T>
}

const Profile: React.FC<Props> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile