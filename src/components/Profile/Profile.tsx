import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {MessagesPostType} from './MyPosts/Post/Post';

type ProfilePropsType = {
  messagesPosts: MessagesPostType[]
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo/>      
      <MyPosts messagesPosts={props.messagesPosts}/>
    </div>
  );
};

export default Profile;