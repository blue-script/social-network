import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {checkAuthorization} from "../../redux/auth-reducer";
import {AuthDataType} from "../../api/api";
import {FormControl} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={FormControl}
                   type='input'
                   name="login"
                   placeholder="Login"
                   validate={[required]}
            />
        </div>
        <div>
            <Field component={FormControl}
                   type='input'
                   name="password"
                   placeholder="Password"
                   validate={[required]}
            />
        </div>
        <div>
            <Field component={FormControl}
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
        console.dir(formData)

        props.checkAuthorization({
            email: formData.login,
            password: formData.password,
            rememberMe: formData.rememberMe
        })
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {checkAuthorization})
)(Login)


// types
type MapStatePropsType = {}
type MapDispatchPropsType = {
    checkAuthorization: (authData: AuthDataType) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType
