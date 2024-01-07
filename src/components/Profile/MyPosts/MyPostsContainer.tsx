import {addPostActionCreator, PostType, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStatePropsType = {
  posts: PostType[]
  newPostText: string
}
type MapDispatchPropsType = {
  updateNewPostText: (text: string) => void
  addPost: () => void
}
export type MyPostsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;