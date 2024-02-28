import React from "react"
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ProfilePropsType} from "./ProfileContainer"
import Preloader from "../common/Preloader/Preloader"
import {Redirect} from "react-router-dom";

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile