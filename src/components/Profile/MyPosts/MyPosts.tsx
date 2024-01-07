import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsType} from './MyPostsContainer';

const MyPosts: React.FC<MyPostsType> = (props) => {
  const messagesElements = props.posts
    .map(m => <Post key={m.id} id={m.id} message={m.message} likesCount={m.likesCount}/>)
  const onAddPost = () => {
    props.addPost()
  }

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewPostText(e.currentTarget.value)
  }
  return (
    <div className={s.postsBlock}>
      My post
      <div>
        <textarea value={props.newPostText}
                  onChange={onPostChange}
        >New post</textarea>
        <button onClick={onAddPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {messagesElements}
      </div>
    </div>
  );
};

export default MyPosts;