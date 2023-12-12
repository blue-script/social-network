import React from 'react';
import s from './MyPosts.module.css'
import Post, {PostType} from './Post/Post';

export type MyPostsPropsType = {
  posts: PostType[],
  addPost: (message: string) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const messagesElements = props.posts
    .map(m => <Post id={m.id} message={m.message} likesCount={m.likesCount}/>)
  let newPostElement = React.createRef<HTMLTextAreaElement>()
  const addPost = () => {
    if (newPostElement.current) {
      props.addPost(newPostElement.current.value)
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