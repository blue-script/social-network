import React, {FC} from "react"
import {UserType} from "./UsersContainer"
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: number[]
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


const Users: FC<UsersPropsType> = ({currentPage, pageSize, totalUsersCount, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} pageSize={pageSize} totalUsersCount={totalUsersCount}
                   onPageChanged={onPageChanged}/>
        <div>
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     follow={props.follow}
                                     unfollow={props.unfollow}
                                     followingInProgress={props.followingInProgress}
                />)
            }
        </div>
    </div>
}

export default Users