import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {getUserProfile, ProfileType} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"

class ProfileContainer extends React.Component<ProfilePropsType, ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "2"
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type mapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type mapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}
type PathParamsType = {
    userId: string,
}

type OwnPropsType = mapStatePropsType & mapDispatchPropsType

export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType

let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)