import React from 'react';
import s from './Header.module.scss'
import logo from '../../../assets/it-inc-logo.svg'
import {Link, useLocation} from 'react-router-dom'
import {PATH} from '../u1-Route/Variables/routeVariables';
import {Button} from '../common/c1-components/Button/Button';
import {useAppSelector} from 's1-main/m2-bll/store';
import noAvatar from '../../../assets/no-avatar.png'
import {getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {getProfileInfo} from 's1-main/m2-bll/selectors/profile-selectors';

export const Header = () => {
		const {pathname} = useLocation()

		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const profile = useAppSelector(getProfileInfo)

		return (
				<header className={s.header}>
						<div className={s.container}>
								<Link to={'/'}>
										<img src={logo} alt="logo"/>
								</Link>
								{isLoggedIn
										? (
												<Link to={PATH.PROFILE} style={{textDecoration: 'none', color: 'black'}}>
														<div className={s.profileContainer}>
																<div className={s.profileName}>
																		{profile.name}
																</div>
																<img
																		src={profile.avatar || noAvatar}
																		alt="ava" style={{width: '36px', height: '36px', borderRadius: '50%'}}/>
														</div>
												</Link>
										)
										: (
												pathname !== PATH.LOGIN &&
												<Link to={PATH.LOGIN}>
														<Button style={{width: '115px'}}>Sign in</Button>
												</Link>
										)
								}
						</div>
				</header>
		);
};