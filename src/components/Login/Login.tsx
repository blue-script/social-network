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

type Props = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, Props> & Props> = ({
                                                                                      handleSubmit,
                                                                                      captchaUrl = null,
                                                                                      error
                                                                                  }) => {
    return <form className={s.formContainer} onSubmit={handleSubmit}>
        <p>
            Из-за реализации авторизации на backend через cookies, авторизация на сайте
            корректно не работает в браузерах Safari и Yandex из-за политики по ограничению к
            доступу cookies. Необходимо в данных браузерах самостоятельно включить cookies.
            <a
                href="https://dzen.ru/video/watch/615181f2b070b34446419b6c?t=43&utm_referrer=dzen.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{display: "block"}}
            >
                Видео как включить cookies в Yandex браузере.
            </a>
            <a
                href="https://media.ithaca.edu/media/Allow+Third+Party+Cookies+-+Safari/1_n3cjqzz9/38123261"
                target="_blank"
                rel="noopener noreferrer"
                style={{display: "block"}}
            >
                Видео как включить cookies в Safari браузере.
            </a>
        </p>
        <div className={s.testData}>
            <h4>Test account details:</h4>
            <span>Email: free@samuraijs.com</span>
            <span>Password: free</span>
        </div>
        {createField<LoginFormDataTypeKeys>("Email", "email", [required], Input)}
        {createField<LoginFormDataTypeKeys>("Password", "password", [required], Input, {type: "password"})}
        {createField<LoginFormDataTypeKeys>("", "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
        {captchaUrl && createField<LoginFormDataTypeKeys>("Symbols from image", "captcha", [required], Input)}

        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <button className={s.button}>Log In</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormDataType, Props>({form: 'login'})(LoginForm)

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormDataTypeKeys = Extract<keyof LoginFormDataType, string>

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            captcha: formData.captcha
        })
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div className={s.container}>
        <div className={s.wrapperForm}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    </div>
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

type MapDispatchPropsType = {
    login: (authData: AuthDataType) => void
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {login})
)(Login)
