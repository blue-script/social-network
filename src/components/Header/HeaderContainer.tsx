import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {getAuthUserData, logout} from "../../redux/auth-reducer"

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { logout})(HeaderContainer)

// types
type MapDispatchPropsType = {
    logout: () => void
}
type MapStatePropsType = {
    isAuth: boolean | null
    login: string | null
}
export type AuthPropsType = MapStatePropsType & MapDispatchPropsType