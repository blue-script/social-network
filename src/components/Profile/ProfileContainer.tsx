import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer"
import {AppRootStateType} from "../../redux/redux-store"
import {RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

import {ProfileRequestType} from "../../api/profile-api";

type PathParamsType = {
    userId: string,
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
export type ProfilePropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfilePropsType, AppRootStateType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push("/login")
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')")
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<AppRootStateType>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

type mapStatePropsType = {
    profile: ProfileRequestType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
let mapStateToProps = (state: AppRootStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

type mapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: <T>(profile: Partial<ProfileRequestType>) => Promise<T>
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
