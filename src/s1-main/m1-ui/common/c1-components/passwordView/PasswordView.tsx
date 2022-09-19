import React, {useState} from 'react';

import {Input} from '../Input/Input';
import {Button} from '../Button/Button';

import style from './PasswordView.module.scss'

import open from '../../c3-image/open.png'
import close from '../../c3-image/close.png'

export const PasswordView = () => {
    const [isOpenPassword, setIsOpenPassword] = useState(false)

    const inputType = isOpenPassword ? 'text':'password'

    const onChangeIsOpenStatus = () => {
      setIsOpenPassword(!isOpenPassword)
    }

    return (
        <div className={style.mainComponent}>
            <Input className={style.input} type={inputType}/>
            <Button className={style.button} onClick={onChangeIsOpenStatus}>
                {
                    isOpenPassword
                        ? <img src={open} alt={'open'} className={style.img}/>
                        : <img src={close} alt={'close'} className={style.img}/>
                }
            </Button>
        </div>
    );
};
