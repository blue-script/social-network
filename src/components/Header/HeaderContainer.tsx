import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {AuthType, setAuthUserData} from "../../redux/auth-reducer"
import {authAPI} from "../../api/api"

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {
  componentDidMount() {
    this.props.setAuthUserData()
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
  setAuthUserData: () => void
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)