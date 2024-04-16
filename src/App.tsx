import React from "react"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import UsersContainer from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {AppRootStateType, store} from "./redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component<AppPropsType, AppRootStateType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        // only for myself test
        // error handler
        // alert(promiseRejectionEvent.reason)
    }

    componentDidMount() {
        this.props.initializeApp()

        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>

                    <Switch >
                        <Redirect exact from="/" to="/profile" />

                        <Route path="/dialogs"
                               render={withSuspense(DialogsContainer)}/>

                        <Route path="/profile/:userId?"
                               render={withSuspense(ProfileContainer)}/>

                        <Route path="/users" render={() => <UsersContainer/>}/>

                        <Route path="/login" render={() => <LoginPage/>}/>

                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>

                        <Route path="*" render={() => <div>404 NOT FOUND</div>}/>

                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp

// types
type mapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type AppPropsType = mapStatePropsType & MapDispatchPropsType