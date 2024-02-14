import styles from "./users.module.css"
import userPhoto from "../../assets/images/defaultUserPhoto.png"
import React, {FC} from "react"
import {UserType} from "./UsersContainer"
import {NavLink} from "react-router-dom"

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: UserType[]
  unfollow: (userId: number) => void
  follow: (userId: number) => void
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
                     className={props.currentPage === p ? styles.selectedPage : ''}
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
                  ? <button onClick={() => props.unfollow(u.id)}>unfollow</button>
                  : <button onClick={() => props.follow(u.id)}>follow</button>
              }
            </div>
        </span>
        <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{'u.location.country'}</div>
            <div>{'u.location.city'}</div>
          </span>
        </span>
      </div>)
    }
  </div>
}

export default Users