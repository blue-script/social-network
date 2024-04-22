import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsType} from './MyPostsContainer';
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";

const MyPosts: React.FC<MyPostsType> = (props) => {

    const messagesElements = [...props.posts]
        .reverse()
        .map(m => <Post key={m.id} message={m.message} likesCount={m.likesCount}/>)

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {messagesElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;

