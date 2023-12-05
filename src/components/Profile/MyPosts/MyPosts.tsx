import React from 'react';
import s from './MyPosts.module.css'
import Post, {MessagesPostType} from './Post/Post';

export type MyPostsPropsType = {
  messagesPosts: MessagesPostType[]
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  let messagesElements = props.messagesPosts
    .map(m => <Post id={m.id} message={m.message} likesCount={m.likesCount}/>)
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