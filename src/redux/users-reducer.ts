import {ActionsTypes} from "./redux-store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type UserType = {
  id: number
  photoUrl: string
  followed: boolean
  fullName: string
  status: string
  location: { city: string, country: string }
}

export type UsersPageType = {
  users: Array<UserType>
}

const initialState: UsersPageType = {
  users: []
}

const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId
          ? {...u, followed: true}
          : u)
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId
          ? {...u, followed: false}
          : u)
      }
    }
    case SET_USERS: {
      return {...state, users: [...state.users, ...action.users]}
    }
    default: {
      return state
    }
  }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}) as const
export default usersReducer