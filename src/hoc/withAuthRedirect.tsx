import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type mapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): mapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: React.FC<mapStatePropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<mapStatePropsType, {}, WCP, AppRootStateType>(mapStateToProps)(RedirectComponent)
}

