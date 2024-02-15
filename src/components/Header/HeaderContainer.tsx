import React from "react"
import Header from "./Header"
import axios from "axios"
import {connect} from "react-redux"
import {AppRootStateType} from "../../redux/redux-store"
import {AuthType, setAuthUserData} from "../../redux/auth-reducer"

export type AuthResponse = {
  "data": AuthType
  "messages": string[]
  "fieldsErrors": string[]
  "resultCode": number
}

class HeaderContainer extends React.Component<AuthPropsType, AuthPropsType> {
  componentDidMount() {
    // this.props.toggleIsFetching(true)
    axios.get<AuthResponse>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
      .then(response => {
        // this.props.toggleIsFetching(false)
        this.props.setAuthUserData(response.data.data)
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