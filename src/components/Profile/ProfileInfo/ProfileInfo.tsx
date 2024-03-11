import React from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer"
import Preloader from "../../common/Preloader/Preloader"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo: React.FC<{ profile: ProfileType | null }> = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
      {/*<img*/}
      {/*  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EHqf4sCRw7OupIheEHLyp8LAislACRZz9LbULv5IXLvXUAWGJ76RvlonKwd4X2rvuw&usqp=CAU"*/}
      {/*  alt="backImage"*/}
      {/*/>*/}
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="photo user" style={{width: "200px", height: "200px"}}/>
        <ProfileStatus status={'hello world'}/>
      </div>
    </div>
  )
}

export default ProfileInfo