import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {AuthType, setAuthUserData} from "../../redux/auth-reducer"
import {authAPI} from "../../api/api"

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true)
    authAPI.getMe().then(data => {
      // this.props.toggleIsFetching(false)
      this.props.setAuthUserData(data)
    })
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
  setAuthUserData: (data: AuthType) => void
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)