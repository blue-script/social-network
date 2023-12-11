import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Dialogs, {dialogType, MessagesType} from './components/Dialogs/Dialogs'
import {PostType} from './components/Profile/MyPosts/Post/Post';
import Profile from './components/Profile/Profile'
import {BrowserRouter, Route} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'

type AppPropsType = {
  dialogs: dialogType[]
  messages: MessagesType[]
  posts: PostType[]
}
const App: React.FC<AppPropsType> = (props) => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <Navbar/>
        <div className={'app-wrapper-content'}>
          <Route path="/dialogs" render={() => <Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
          <Route path="/profile" render={() => <Profile posts={props.posts}/>}/>
          <Route path="/news" render={() => <News/>}/>
          <Route path="/music" render={() => <Music/>}/>
          <Route path="/settings" render={() => <Settings/>}/>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
