import React from 'react';

import style from './Profile.module.scss'
import styleContainer from '../../s1-main/m1-ui/common/c2-styles/Container.module.css'
import styleBlock from '../../s1-main/m1-ui/common/c2-styles/Block.module.css'

import userPhoto from '../../s1-main/m1-ui/common/c3-image/photo/catPhoto.png'
import arrow from '../../s1-main/m1-ui/common/c3-image/photo/arrow.png'

import {Button} from '../../s1-main/m1-ui/common/c1-components/Button/Button';

import {Link, Navigate} from 'react-router-dom';
import {login, packsList} from '../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import {useAppDispatch, useAppSelector} from '../../s1-main/m2-bll/store';
import {EditableSpan} from '../../s1-main/m1-ui/common/c1-components/EditableSpan/EditableSpan';
import {logout} from '../../s1-main/m2-bll/reducers/auth-reducer';
import {updateUser} from '../../s1-main/m2-bll/reducers/profile-reducer';


export const Profile = () => {
    const profile = useAppSelector(state => state.profile.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    console.log(profile)

    const onChangeUserName = (name: string) => {
        dispatch(updateUser(name))
    }

    const onLogoutClick = () => {
        dispatch(logout())
    }

    if(!isLoggedIn){
        return <Navigate to={login}/>
    }

    return (
        <div className={`${styleContainer.container} ${style.profileContainer}`}>

            <Link to={packsList} className={style.link}>
                <img src={arrow} alt={'arrow'} className={style.arrowImg}/>
                <span className={style.textLink}>Back to Packs List</span>
            </Link>

            <div className={`${styleBlock.block} ${style.profileBlock}`}>
                <h1 className={style.header}>
                    Personal Information
                </h1>

                <img className={style.userPhoto}
                     src={userPhoto}
                     alt={'user'}
                />

                <h2 className={style.name}>
                    <EditableSpan value={profile.name} onChange={(value)=>onChangeUserName(value)}/>
                </h2>
                <h3 className={style.email}>
                    {profile.email}
                </h3>
                <Button className={style.btnLogout} onClick={onLogoutClick}>
                    Log out
                </Button>
            </div>
        </div>
    )
}
