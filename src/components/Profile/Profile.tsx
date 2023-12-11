import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PostType} from './MyPosts/Post/Post';

type ProfilePropsType = {
  state: {
    posts: PostType[]
  },
  addPost: (message: string) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo/>
      <MyPosts posts={props.state.posts} addPost={props.addPost}/>
    </div>
  );
};

export default Profile;