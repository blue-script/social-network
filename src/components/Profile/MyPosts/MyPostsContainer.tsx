import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';
import {profileActions} from "../../../redux/profile-reducer";

type PostType = {
    id: number
    message: string
    likesCount: number
}
type MapStatePropsType = {
    posts: PostType[]
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(profileActions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;