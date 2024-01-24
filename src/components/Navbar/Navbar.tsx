import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import FriendsContainer from '../Friends/FriendsContainer';

const Navbar: React.FC = () => {
	return (
		<nav className={s.nav}>
			<ul>
				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/profile'>Profile</NavLink>
				</li>
				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/dialogs'>Messages</NavLink>
				</li>
				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/users'>Users</NavLink>
				</li>

				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/news'>News</NavLink>
				</li>
				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/music'>Music</NavLink>
				</li>
				<li className={s.item}>
					<NavLink activeClassName={s.activeLink} to='/settings'>Settings</NavLink>
				</li>
			</ul>
			<FriendsContainer/>
		</nav>
	)
}

export default Navbar
