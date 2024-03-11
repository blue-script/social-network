import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {getUserProfile, ProfileType} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfilePropsType, ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "2"
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppRootStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
})

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


// types
type mapStatePropsType = {
    profile: ProfileType | null
}
type mapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}
type PathParamsType = {
    userId: string,
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType