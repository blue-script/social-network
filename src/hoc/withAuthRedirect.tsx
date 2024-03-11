import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

const mapStateToProps = (state: AppRootStateType): mapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    // class RedirectComponent extends React.Component<any, any> {
    //     render(){
    //         if (!this.props.isAuth) return <Redirect to={"/login"}/>
    //         return <Component {...this.props as T}/>
    //     }
    // }

    function RedirectComponent(props: mapStatePropsType) {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}

type mapStatePropsType = {
    isAuth: boolean
}