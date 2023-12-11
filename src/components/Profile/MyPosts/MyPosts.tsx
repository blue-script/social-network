import React, {LegacyRef, RefObject} from 'react';
import s from './MyPosts.module.css'
import Post, {PostType} from './Post/Post';

export type MyPostsPropsType = {
  posts: PostType[]
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  let messagesElements = props.posts
    .map(m => <Post id={m.id} message={m.message} likesCount={m.likesCount}/>)
  let newPostElement = React.createRef<HTMLTextAreaElement>()
  let addPost = () => {
    if (newPostElement.current) {
      let text = newPostElement.current.value
      alert(text)
    }
  }
  return (
    <div className={s.postsBlock}>
      My post
      <div>
        <textarea ref={newPostElement}>New post</textarea>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.posts}>
        {messagesElements}
      </div>
    </div>
  );
};

export default MyPosts;