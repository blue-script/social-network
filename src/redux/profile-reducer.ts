import {BaseThunkType, InferActionsType} from "./redux-store"
import {FormAction, stopSubmit} from "redux-form";
import {ResultCodes} from "../enums/enums";
import {profileAPI, ProfileRequestType} from "../api/profile-api";

const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11}
    ],
    profile: null as null | ProfileRequestType,
    status: '',
    newPostState: ''
}

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
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
        case "SN/PROFILE/SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case "SN/PROFILE/SET-STATUS":
            return {...state, status: action.userId}
        case "SN/PROFILE/DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case "SN/PROFILE/SAVE-PHOTO-SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileRequestType}
        default:
            return state
    }
}

export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({type: "SN/PROFILE/ADD-POST", newPostText}) as const,
    setUserProfile: (profile: ProfileRequestType) => ({type: "SN/PROFILE/SET-USER-PROFILE", profile}) as const,
    setStatus: (userId: string) => ({type: "SN/PROFILE/SET-STATUS", userId}) as const,
    deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE-POST", postId}) as const,
    savePhotoSuccess: (photos: { small: string, large: string }) => ({
        type: "SN/PROFILE/SAVE-PHOTO-SAVE_PHOTO_SUCCESS",
        photos
    }) as const
}

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
}
export const getUserStatus = (userId: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setStatus(status))
        }
    } catch (error) {
        // error handler
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(profileActions.savePhotoSuccess(data.data))
    }
}
export const saveProfile = (profile: Partial<ProfileRequestType>): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodes.Success) {
        if (userId) {
                    dispatch(getUserProfile(userId.toString()))
        } else {
            throw new Error("UserId can't be null")
        }
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : "Some error"
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

type InitialStateType = typeof initialState
export type ProfileActionsType = InferActionsType<typeof profileActions>
type ThunkType = BaseThunkType<ProfileActionsType | FormAction>