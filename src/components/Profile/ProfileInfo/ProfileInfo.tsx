import React from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer"
import Preloader from "../../common/Preloader/Preloader"

const ProfileInfo: React.FC<{ profile: ProfileType | null }> = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EHqf4sCRw7OupIheEHLyp8LAislACRZz9LbULv5IXLvXUAWGJ76RvlonKwd4X2rvuw&usqp=CAU"
        alt="backImage"
      />
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="photo user" style={{width: "200px", height: "200px"}}/>
        <div>{props.profile.fullName}</div>
        <div>aboutMe: {props.profile.aboutMe}</div>
        <div>search job: {props.profile.lookingForAJob ? "yes" : "no"}</div>
        <div>description job: {props.profile.lookingForAJobDescription}</div>
        <div> Contacts:
          <ul>
            <li>{props.profile.contacts.vk}</li>
            <li>{props.profile.contacts.github}</li>
            <li>{props.profile.contacts.facebook}</li>
            <li>{props.profile.contacts.twitter}</li>
            <li>{props.profile.contacts.mainLink}</li>
            <li>{props.profile.contacts.instagram}</li>
            <li>{props.profile.contacts.website}</li>
            <li>{props.profile.contacts.youtube}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo