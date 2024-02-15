import React from "react"
import s from "./Header.module.css"
import logo from "../../assets/images/logo.png"
import {NavLink} from "react-router-dom"
import {AuthPropsType} from "./HeaderContainer"

const Header: React.FC<AuthPropsType> = (props) => {
  return (
    <header className={s.header}>
      <img src={logo} alt=""/>
      <div className={s.loginBlock}>
        {
          props.isAuth
            ? props.login
            : <NavLink to="/login">Login</NavLink>
        }
      </div>
    </header>
  )
}

export default Header