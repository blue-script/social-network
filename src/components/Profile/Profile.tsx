import React from "react"
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ProfilePropsType} from "./ProfileContainer"
import {ProfileType} from "../../redux/profile-reducer";

type Props = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile: React.FC<Props> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile