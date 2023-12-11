import React from 'react';
import s from './Post.module.css'

export type PostType = {
  id: string
  message: string
  likesCount: number
}
const Post: React.FC<PostType> = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8ZaLUTA2vEGXFAah4FD0Xvpt7kK3l5gmhMDvPcQG6qu65IuvVJxi3_OofRKdB0AvP4Y&usqp=CAU"
        alt=""/>
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;