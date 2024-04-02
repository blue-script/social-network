import styles from "./users.module.css"
import userPhoto from "../../assets/images/defaultUserPhoto.png"
import React, {FC} from "react"
import {UserType} from "./UsersContainer"
import {NavLink} from "react-router-dom"


type UserPropsType = {
    followingInProgress: number[]
    user: UserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


const User: FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div>
        <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.small ? user.photos.small : userPhoto} alt="avatar"
                     className={styles.userPhoto}/>
              </NavLink>
            </div>
            <div>
              {
                  user.followed
                      ? <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>unfollow</button>
                      : <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}>follow</button>
              }
            </div>
        </span>

        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </span>
        </span>
    </div>
}

export default User