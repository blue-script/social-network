import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post, {PostType} from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';

export type MyPostsPropsType = {
  posts: PostType[],
  newPostText: string
  dispatch: (action: any) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const messagesElements = props.posts
    .map(m => <Post key={m.id} id={m.id} message={m.message} likesCount={m.likesCount}/>)
  const addPost = () => {
    const action = addPostActionCreator()
    props.dispatch(action)
  }

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const action = updateNewPostTextActionCreator(e.currentTarget.value)
    props.dispatch(action)
  }
  return (
    <div className={s.postsBlock}>
      My post
      <div>
        <textarea value={props.newPostText}
                  onChange={onPostChange}
        >New post</textarea>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {messagesElements}
      </div>
    </div>
  );
};

export default MyPosts;