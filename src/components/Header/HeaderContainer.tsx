import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {getAuthUserData} from "../../redux/auth-reducer"

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

type MapStatePropsType = {
    isAuth: boolean | null
    login: string | null
}

export type AuthPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

type MapDispatchPropsType = {
    getAuthUserData: () => void
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)