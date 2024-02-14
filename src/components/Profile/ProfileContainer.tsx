import React from "react"
import Profile from "./Profile"
import axios from "axios"
import {UsersResponse} from "../Users/UsersContainer"
import {connect} from "react-redux"
import {ProfileType, setUserProfile} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"
import {RouteComponentProps, withRouter} from "react-router-dom"

class ProfileContainer extends React.Component<ProfilePropsType, any> {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) userId = '2'
    axios.get<UsersResponse>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
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

type mapStatePropsType = {
  profile: ProfileType | null
}

type mapDispatchPropsType = {
  setUserProfile: (profile: any) => void
}
type PathParamsType = {
  userId: string,
}

type OwnPropsType = mapStatePropsType & mapDispatchPropsType

export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType

let mapStateToProps = (state: AppRootStateType) => ({
  profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)