import {UsersPropsType} from "./UsersContainer";
import {FC} from "react";
import styles from "./users.module.css"
import axios from "axios"
import userPhoto from '../../assets/images/defaultUserPhoto.png'

export type UserType =  {
  name: string
  id: number
  photos: {
    small: null | string
    large: null | string
  }
  status: null | string
  followed: boolean
}

const Users: FC<UsersPropsType> = (props) => {
  const getUsers = () => {
    if (props.users.length === 0) {
      axios.get<{ items: UserType[] }>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
        props.setUsers(response.data.items)
      })
    }
  }


  return <div>
    <button onClick={getUsers}>Get Users</button>
    {
      props.users.map(u => <div key={u.id}>
        <span>
            <div>
              <img src={u.photos.small ? u.photos.small : userPhoto} alt="avatar" className={styles.userPhoto}/>
            </div>
            <div>
              {
                u.followed
                  ? <button onClick={()=>props.unfollow(u.id)}>unfollow</button>
                  : <button onClick={()=>props.follow(u.id)}>follow</button>
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