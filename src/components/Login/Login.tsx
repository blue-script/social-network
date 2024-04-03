import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AuthDataType} from "../../api/api";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css"
import s from "./Login.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return <form className={s.formContainer} onSubmit={handleSubmit}>
        {createField("Email", "email", [required], Input)}
        {createField("Password", "password", [required], Input, {type: "password"})}
        {createField("", "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <button className={s.button}>Log In</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
        })
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div className={s.container}>
        <div className={s.wrapperForm}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    </div>
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {login})
)(Login)


// types
type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (authData: AuthDataType) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType
