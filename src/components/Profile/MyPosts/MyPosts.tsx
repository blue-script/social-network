import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsType} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

const MyPosts: React.FC<MyPostsType> = (props) => {
    const messagesElements = props.posts
        .map(m => <Post key={m.id} id={m.id} message={m.message} likesCount={m.likesCount}/>)

    const onAddPost = (formData: FormDataType) => {
        props.addPost(formData.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            My post
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {messagesElements}
            </div>
        </div>
    );
};

export const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="textarea" name="newPostText" placeholder="New post"/>
        <button>Add post</button>
    </form>
}

export const AddNewPostFormRedux = reduxForm<FormDataType>({form: "profileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;

//types
type FormDataType = {
    newPostText: string
}