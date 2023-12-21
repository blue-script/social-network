import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PostType} from './MyPosts/Post/Post';

type ProfilePropsType = {
  profilePage: {
    posts: PostType[]
    newPostText: string
  },
  addPost: () => void
  updateNewPostText: (postText: string) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo/>
      <MyPosts posts={props.profilePage.posts} newPostText={props.profilePage.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
    </div>
  );
};

export default Profile;