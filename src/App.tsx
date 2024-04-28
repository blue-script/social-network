import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'
import {connect, Provider} from 'react-redux'
import {AppRootStateType, store} from './redux/redux-store'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import {withSuspense} from './hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type Props = mapStatePropsType & MapDispatchPropsType

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<Props, AppRootStateType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occurred')
    // only for myself test
  }

  componentDidMount() {
    this.props.initializeApp()

    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className={'app-wrapper-content'}>

          <Switch>
            <Redirect exact from="/" to="/profile"/>

            <Route path="/dialogs"
                   render={() => <SuspendedDialogs/>}/>

            <Route path="/profile/:userId?"
                   render={() => <SuspendedProfile/>}/>

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

type mapStatePropsType = {
  initialized: boolean
}
const mapStateToProps = (state: AppRootStateType) => ({
  initialized: state.app.initialized
})

type MapDispatchPropsType = {
  initializeApp: () => void
}
const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp
