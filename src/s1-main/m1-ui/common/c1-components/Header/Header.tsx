import React from 'react';
import s from './Header.module.scss'
import logo from '../../../../../assets/it-inc-logo.svg'
import {Link, useLocation} from 'react-router-dom'
import {login, profile} from '../../../u1-Route/Variables/routeVariables';
import {Button} from '../Button/Button';

export const Header2 = () => {
		const {pathname} = useLocation()
		// take from state
		const isLoggedIn = false
		const profileObj = {
				name: 'Ivan',
				ava: 'https://games.mail.ru/hotbox/content_files/news/2021/10/20/fa3270a82e8c4e77b4de586cbd86bc17.jpg'
		}
		// take from state
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
																		{profileObj.name}
																</div>
																<img
																		src={profileObj.ava}
																		alt="" style={{width: '36px', height: '36px', borderRadius: '50%'}}/>
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
