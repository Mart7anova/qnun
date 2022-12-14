import React, {useEffect, useState} from 'react';

import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './CheckEmail.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

import emailImg from '../../../s1-main/m1-ui/common/c3-image/email.png'
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';

import {Navigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {setIsRequestSuccess} from 's1-main/m2-bll/reducers/auth-reducer';
import {getAppStatus} from '../../../s1-main/m2-bll/selectors/app-selectors';

export const CheckEmail = () => {
    const [linkToLogin, setLinkToLogin] = useState(false)
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(getAppStatus)

    const onBackToLoginClick = () => {
        setLinkToLogin(true)
    }

    useEffect(()=>{
        dispatch(setIsRequestSuccess(false))
    },[])

    if(linkToLogin){
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={`${styleContainer.container} ${style.checkEmailContainer}`}>
            <div className={`${styleBlock.block} ${style.checkEmailPassBlock}`}>
                <h1 className={style.header}>
                    Check Email
                </h1>
                <img src={emailImg} alt={'email'}/>
                <span className={style.informationText}>
                    We've sent an Email with instruction to {'props.email'}
                </span>
                <Button onClick={onBackToLoginClick} className={style.button} disabled={appStatus==='loading'}>Back to login</Button>
            </div>
        </div>
    );
};
