import styles from "./users.module.css"
import s from "./users.module.css"
import userPhoto from "../../assets/images/defaultUserPhoto.png"
import React from "react"
import {NavLink} from "react-router-dom"
import {UserType} from "../../types/types";

type Props = {
    user: UserType
    followingInProgress: number[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


const User: React.FC<Props> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={s.userContainer}>
        <div className={s.about}>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : userPhoto} alt="avatar"
                         className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div className={s.info}>
                <span className={s.userName}>{user.name}</span>
                <span className={s.userStatus}>{user.status}</span>
            </div>
            <div>
                {
                    user.followed
                        ? <button className={s.button} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>unfollow</button>
                        : <button className={s.button} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>follow</button>
                }
            </div>
        </div>
    </div>
}

export default User