import React from 'react';
import s from './Post.module.css'
import defaultIcon from '../../../../assets/images/defaultUserPhoto.png'

export type PostType = {
  id: number
  message: string
  likesCount: number
}
const Post: React.FC<PostType> = (props) => {
  return (
    <div className={s.item}>
      <img
        src={defaultIcon}
        alt=""/>
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;