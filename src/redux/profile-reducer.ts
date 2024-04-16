import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction, Dispatch} from "redux";
import {profileAPI, ProfileRequestType} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const ADD_POST = "profile/ADD-POST"
const SET_USER_PROFILE = "profile/SET-USER-PROFILE"
const SET_STATUS = "profile/SET-STATUS"
const DELETE_POST = "profile/DELETE-POST"
const SAVE_PHOTO_SUCCESS = "profile/SAVE-PHOTO-SAVE_PHOTO_SUCCESS"

type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11}
    ],
    profile: null as null | ProfileType,
    status: '',
    newPostState: ''
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: StoreActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length + 1,
                        message: action.newPostText,
                        likesCount: 0
                    }
                ],
                newPostState: ''
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.userId}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}

export type AddPostActionCreatorActionType = ReturnType<typeof addPostActionCreator>
export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export type SetStatusActionType = ReturnType<typeof setStatus>
export const setStatus = (userId: string) => ({type: SET_STATUS, userId}) as const
export type DeletePostActionType = ReturnType<typeof deletePost>
export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const
export type SavePhotoSuccessActionType = ReturnType<typeof savePhotoSuccess>
export const savePhotoSuccess = (photos: { small: string, large: string }) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
}) as const

export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        // error handler
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: Partial<ProfileRequestType>) => async (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>, getState: () => AppRootStateType) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0 && userId) {
        dispatch(getUserProfile(userId.toString()))
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        const matches = message.match(/\((.*?)\)/)
        if (matches && matches.length > 1) {
            const parsedString = matches[1];
            const [contacts, social] = parsedString.toLowerCase().split('->');
            const mes = message.slice(0, matches.index).trim()

            dispatch(stopSubmit("edit-profile", {[contacts]: {[social]: mes}}))
        } else {
            dispatch(stopSubmit("edit-profile", {_error: message}))
        }
        return Promise.reject(message)
    }
}

export default profileReducer

