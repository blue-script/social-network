import {BaseThunkType, InferActionsType} from './redux-store'
import {APIResponseType} from '../api/api'
import {Dispatch} from 'redux'
import {AxiosResponse} from 'axios'
import {updateObjectInArray} from '../utils/object-helpers'
import {UserType} from '../types/types'
import {ResultCodes} from '../enums/enums'
import {usersApi} from '../api/users-api'

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[] // array of users id
}

const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    }
    case 'SN/USERS/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }
    }
    case 'SN/USERS/SET_USERS': {
      return {...state, users: action.users}
    }
    case 'SN/USERS/SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
      return {...state, totalUsersCount: action.count}
    }
    case 'SN/USERS/TOGGLE_IS_FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
  followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId}) as const,
  unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId}) as const,
  setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users}) as const,
  setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage}) as const,
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
    count: totalUsersCount
  }) as const,
  toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching}) as const,
  toggleFollowingProgress: (userId: number, isFetching: boolean) => ({
    type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
  }) as const
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    const data = await usersApi.getUsers(page, pageSize)
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: Dispatch<UsersActionsType>, userId: number, apiMethod: ApiMethodType, actionCreator: (userId: number) => UsersActionsType) => {
  dispatch(actions.toggleFollowingProgress(userId, true))
  const response = await apiMethod(userId)
  if (response.resultCode === ResultCodes.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(userId, false))
}
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccess)
  }
}
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), actions.unfollowSuccess)
  }
}

export default usersReducer

export type InitialStateType = typeof initialState
export type UsersActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<UsersActionsType>
type ApiMethodType = (userId: number) => Promise<APIResponseType>