import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {MyPostsType} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props: MyPostsType) =>{
    console.log("render MyPosts")

    const messagesElements = [...props.posts]
        .reverse()
        .map(m => <Post key={m.id} id={m.id} message={m.message} likesCount={m.likesCount}/>)

    const onAddPost = (formData: FormDataType) => {
        props.addPost(formData.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {messagesElements}
            </div>
        </div>
    );
})

const maxLength10 = maxLengthCreator(10)

export const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form className={s.formContainer} onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               name="newPostText"
               placeholder="Post message"
               validate={[required, maxLength10]}
        />
        <button className={s.button}>Add post</button>
    </form>
}

export const AddNewPostFormRedux = reduxForm<FormDataType>({form: "profileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;

//types
type FormDataType = {
    newPostText: string
}