import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PostType} from './MyPosts/Post/Post';

type ProfilePropsType = {
  posts: PostType[]
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo/>      
      <MyPosts posts={props.posts}/>
    </div>
  );
};

export default Profile;