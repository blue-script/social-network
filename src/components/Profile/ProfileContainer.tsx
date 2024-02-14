import React from "react"
import Profile from "./Profile"
import axios from "axios"
import {UsersResponse} from "../Users/UsersContainer"
import {connect} from "react-redux"
import {ProfileType, setUserProfile} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"

class ProfileContainer extends React.Component<ProfilePropsType, any> {
  componentDidMount() {
    axios.get<UsersResponse>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        this.props.setUserProfile(response.data)
      })
  }

  render() {
    console.log(this.props)
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType

type mapStatePropsType = {
  profile: ProfileType | null
}
type mapDispatchPropsType = {
  setUserProfile: (profile: any) => void
}

let mapStateToProps = (state: AppRootStateType) => ({
  profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)