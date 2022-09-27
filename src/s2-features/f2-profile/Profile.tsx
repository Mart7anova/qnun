import React from 'react';

import style from './Profile.module.scss'
import styleContainer from '../../s1-main/m1-ui/common/c2-styles/Container.module.css'
import styleBlock from '../../s1-main/m1-ui/common/c2-styles/Block.module.css'

import userPhoto from '../../s1-main/m1-ui/common/c3-image/photo/catPhoto.png'

import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';

import {Navigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {EditableSpan} from 's1-main/m1-ui/common/c1-components/EditableSpan/EditableSpan';
import {logout} from 's1-main/m2-bll/reducers/auth-reducer';
import {updateUser} from 's1-main/m2-bll/reducers/profile-reducer';
import {getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {getProfileInfo} from 's1-main/m2-bll/selectors/profile-selectors';
import {LinkBackTo} from '../../s1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';


export const Profile = () => {
    const profile = useAppSelector(getProfileInfo)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const dispatch = useAppDispatch()

    const onChangeUserName = (name: string) => {
        dispatch(updateUser(name))
    }

    const onLogoutClick = () => {
        dispatch(logout())
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    return (
        <div className={`${styleContainer.container} ${style.profileContainer}`}>

            <LinkBackTo link={PATH.PACKS_LIST}/>

            <div className={`${styleBlock.block} ${style.profileBlock}`}>
                <h1 className={style.header}>
                    Personal Information
                </h1>

                <img className={style.userPhoto}
                     src={userPhoto}
                     alt={'user'}
                />

                <h2 className={style.name}>
                    <EditableSpan value={profile.name}
                                  onChange={(value) => onChangeUserName(value)}
                                  className={style.editableSpan}/>
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
