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

export type UsersResponse = {
  items: UserType[]
  totalCount: number
  error: string
}

class Users extends React.Component<UsersPropsType, UserType[]> {
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
    axios.get<{items: UserType[]}>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    return <div>
      <div>
        {pages.map(p => {
          return <span key={p}
                       className={this.props.currentPage === p ? styles.selectedPage : ''}
                       onClick={(e)=>{this.onPageChanged(p)}}
          > {p} </span>
        })}
      </div>
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