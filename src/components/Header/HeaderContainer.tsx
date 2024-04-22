import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {logout} from "../../redux/auth-reducer"

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

type MapStatePropsType = {
    isAuth: boolean | null
    login: string | null
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

type MapDispatchPropsType = {
    logout: () => void
}
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {logout})(HeaderContainer)

export type AuthPropsType = MapStatePropsType & MapDispatchPropsType