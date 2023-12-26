import {ActionsTypes, PostType, ProfilePageType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const profileReducer = (state: ProfilePageType, action: ActionsTypes): ProfilePageType => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostType = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0
      }
      state.posts.push(newPost)
      state.newPostText = ''
      return state
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.postText
      return state
    default:
      return state
  }
}

export const addPostActionCreator = () => ({type: 'ADD-POST'}) as const
export const updateNewPostTextActionCreator = (text: string) =>
  ({type: 'UPDATE-NEW-POST-TEXT', postText: text})
export default profileReducer