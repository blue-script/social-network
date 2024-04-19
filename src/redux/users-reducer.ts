import {AppRootStateType, InferActionsType} from "./redux-store";
import {ResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {ResultCodes} from "../enums/enums";



const initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[] // array of users id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default: {
            return state
        }
    }
}

export type UsersActionType = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: "FOLLOW", userId}) as const,
    unfollowSuccess: (userId: number) => ({type: "UNFOLLOW", userId}) as const,
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users}) as const,
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage}) as const,
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        count: totalUsersCount
    }) as const,
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching}) as const,
    toggleFollowingProgress: (userId: number, isFetching: boolean) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId
    }) as const
}


type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, UsersActionType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

type ApiMethodType = (userId: number) => Promise<AxiosResponse<ResponseType<{}>>>
type ActionCreatorType = (userId: number) => {
    readonly type: string,
    readonly userId: number
}
const _followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: ApiMethodType, actionCreator: ActionCreatorType) => {
    dispatch(actions.toggleFollowingProgress(userId, true))
    const response = await apiMethod(userId)
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(userId, false))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer