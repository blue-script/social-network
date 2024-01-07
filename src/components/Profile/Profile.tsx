import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {AppRootStateType, StoreType} from '../../redux/redux-store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile: React.FC = () => {
  return (
    <div className={s.content}>
      <ProfileInfo/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;