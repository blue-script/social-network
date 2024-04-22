import MyPostsMemorized from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/redux-store';
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

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {addPost: profileActions.addPostActionCreator})(MyPostsMemorized)

export default MyPostsContainer;