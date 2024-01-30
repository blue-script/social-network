import React from "react"
import styles from "./users.module.css"
import axios from "axios"
import userPhoto from '../../assets/images/defaultUserPhoto.png'
import {UsersPropsType} from "./UsersContainer"

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

class Users extends React.Component<UsersPropsType, UserType[]> {
  // constructor(props: UsersPropsType) {
  //   super(props)
  // }

  componentDidMount() {
    axios.get<{ items: UserType[] }>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  render() {
    return <div>
      {
        this.props.users.map(u => <div key={u.id}>
        <span>
            <div>
              <img src={u.photos.small ? u.photos.small : userPhoto} alt="avatar" className={styles.userPhoto}/>
            </div>
            <div>
              {
                u.followed
                  ? <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
                  : <button onClick={() => this.props.follow(u.id)}>follow</button>
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
}


export default Users