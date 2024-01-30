import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {followAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, unfollowAC,} from "../../redux/users-reducer"
import {Dispatch} from "redux"
import React from "react"
import axios from "axios"
import Users from "./Users"


export type UserType = {
  name: string
  id: number
  photos: {
    small: null | string
    large: null | string
  }
  status: null | string
  followed: boolean
}

export type UsersResponse = {
  items: UserType[]
  totalCount: number
  error: string
}

class UsersContainer extends React.Component<UsersPropsType, UserType[]> {
  // constructor(props: UsersPropsType) {
  //   super(props)
  // }
  componentDidMount() {
    axios.get<UsersResponse>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items)
        this.props.setTotalUsersCount(response.data.totalCount)
      })
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    axios.get<{
      items: UserType[]
    }>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items)
      })
  }

  render() {
    return <Users totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
    />
  }
}


type MapStatePropsType = {
  users: UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
}
type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: UserType[]) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalCount: number) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (pageNumber: number) => {
      dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: (totalCount: number) => {
      dispatch(setUsersTotalCountAC(totalCount))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)