import React from 'react';
import s from './Header.module.scss'
import logo from '../../../../../assets/it-inc-logo.svg'
import {Link, useLocation} from 'react-router-dom'
import {login, profile} from '../../../u1-Route/Variables/routeVariables';
import {Button} from '../Button/Button';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../m2-bll/store';
import noAvatar from '../../../../../assets/no-avatar.png'

export const Header2 = () => {
		const {pathname} = useLocation()

		const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
		const useName = useSelector<AppRootStateType, string>(state => state.profile.profile?.name || 'error')
		const userAvatar = useSelector<AppRootStateType, string>(state => state.profile.profile?.avatar || noAvatar)

		return (
				<header className={s.header}>
						<div className={s.container}>
								<Link to={'/'}>
										<img src={logo} alt="logo"/>
								</Link>
								{isLoggedIn
										? (
												<Link to={profile} style={{textDecoration: 'none', color: 'black'}}>
														<div className={s.profileContainer}>
																<div className={s.profileName}>
																		{useName}
																</div>
																<img
																		src={userAvatar}
																		alt="ava" style={{width: '36px', height: '36px', borderRadius: '50%'}}/>
														</div>
												</Link>
										)
										: (
												pathname !== `/${login}` &&
												<Link to={login}>
														<Button>sign in</Button>
												</Link>
										)
								}
						</div>
				</header>
		);
};
