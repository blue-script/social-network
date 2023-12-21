import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post, {PostType} from './Post/Post';

export type MyPostsPropsType = {
  posts: PostType[],
  newPostText: string
  addPost: () => void
  updateNewPostText: (postText: string) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const messagesElements = props.posts
    .map(m => <Post key={m.id} id={m.id} message={m.message} likesCount={m.likesCount}/>)
  const addPost = () => {
    props.addPost()
  }
  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) props.updateNewPostText(e.currentTarget.value)
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