import React, {FC} from "react"
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import s from "./users.module.css"
import {UserType} from "../../types/types";

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
    return <div className={s.container}>
        <Paginator currentPage={currentPage} pageSize={pageSize} totalItemsCount={totalUsersCount}
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