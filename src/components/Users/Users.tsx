import styles from "./users.module.css"
import userPhoto from "../../assets/images/defaultUserPhoto.png"
import React, {FC} from "react"
import {UserType} from "./UsersContainer"
import {NavLink} from "react-router-dom"
import {followUnfollowAPI} from "../../api/api"
import {toggleFollowingProgress} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: number[]
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    toggleFollowingProgress: (userId: number, isFetching: boolean) => void
}


const Users: FC<UsersPropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    for (let i = pagesCount - 10; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span key={p}
                             className={props.currentPage === p ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                > {p} </span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
        <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img src={u.photos.small ? u.photos.small : userPhoto} alt="avatar"
                     className={styles.userPhoto}/>
              </NavLink>
            </div>
            <div>
              {
                  u.followed
                      ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                          props.toggleFollowingProgress(u.id,true)
                          followUnfollowAPI.unfollow(u.id).then(response => {
                              if (response.data.resultCode === 0) props.unfollow(u.id)
                              props.toggleFollowingProgress(u.id,false)
                          })
                      }}>unfollow</button>
                      : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                          props.toggleFollowingProgress(u.id,true)
                          followUnfollowAPI.follow(u.id).then(response => {
                              if (response.data.resultCode === 0) props.follow(u.id)
                              props.toggleFollowingProgress(u.id,false)
                          })
                      }}>follow</button>
              }
            </div>
        </span>
                <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{"u.location.country"}</div>
            <div>{"u.location.city"}</div>
          </span>
        </span>
            </div>)
        }
    </div>
}

export default Users