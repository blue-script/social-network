import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AuthDataType} from "../../api/api";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input}
                   name="email"
                   placeholder="Email"
                   validate={[required]}
            />
        </div>
        <div>
            <Field component={Input}
                   type="password"
                   name="password"
                   placeholder="Password"
                   validate={[required]}
            />
        </div>
        <div>
            <Field component={Input}
                   name="rememberMe"
                   type="checkbox"
            />remember me
        </div>
        <div>
            <button>Log In</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginPropsType) => {
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

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
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
