import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {AppRootStateType, StoreType} from '../../../redux/redux-store';

export type MyPostsPropsContainerType = {
  store: StoreType
}
const MyPostsContainer: React.FC<MyPostsPropsContainerType> = (props) => {
  const state: AppRootStateType =  props.store.getState()
  const addPost = () => {
    const action = addPostActionCreator()
    props.store.dispatch(action)
  }

  const updateNewPostText = (text: string) => {
    const action = updateNewPostTextActionCreator(text)
    props.store.dispatch(action)
  }
  return (
    <MyPosts updateNewPostText={updateNewPostText}
             addPost={addPost}
             posts={state.profilePage.posts}
             newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;