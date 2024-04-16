import {AppRootStateType} from "./redux-store";
import {createSelector, Selector} from "reselect";
import {UserType} from "../types/types";

export const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}
export const getUsers: Selector<AppRootStateType, UserType[]> = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}
