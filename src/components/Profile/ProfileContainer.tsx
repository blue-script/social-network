import React from "react"
import Profile from "./Profile"
import axios from "axios"
import {connect} from "react-redux"
import {ProfileType, setUserProfile, setUserProfileSuccess} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"
import {RouteComponentProps, withRouter} from "react-router-dom"
import {profileAPI, UsersResponseType} from "../../api/api"

class ProfileContainer extends React.Component<ProfilePropsType, ProfilePropsType> {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) userId = "2"
    this.props.setUserProfile(userId)
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

type mapStatePropsType = {
  profile: ProfileType | null
}

type mapDispatchPropsType = {
  setUserProfile: (userId: string) => void
  setUserProfileSuccess: (data: any) => void
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

export default connect(mapStateToProps, {setUserProfile, setUserProfileSuccess})(WithUrlDataContainerComponent)