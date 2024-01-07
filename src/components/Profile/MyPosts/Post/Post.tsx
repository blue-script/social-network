import React from 'react';
import s from './Post.module.css'

export type PostType = {
  id: number
  message: string
  likesCount: number
}
const Post: React.FC<PostType> = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://www.transparentpng.com/thumb/human/black-human-user-profile-png-icon-free-fsR5FT.png"
        alt=""/>
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;