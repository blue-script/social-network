import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

type MessageType = {
  id: string
  message: string
  likesCount: number
}
const MyPosts = () => {
  let messages: MessageType[] = [
    {id: '1', message: 'Hi, how are you?', likesCount: 12},
    {id: '2', message: 'It\'s my first post', likesCount: 11}
  ]
  let messagesElements = messages
    .map(m => <Post message={m.message} likesCount={m.likesCount}/>)
  return (
    <div className={s.postsBlock}>
      My post
      <div>
        <textarea>New post</textarea>
        <button>Add post</button>
      </div>
      <div className={s.posts}>
        {messagesElements}
      </div>
    </div>
  );
};

export default MyPosts;