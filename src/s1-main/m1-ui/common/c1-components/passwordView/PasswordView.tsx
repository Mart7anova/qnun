import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';

import {Input} from '../Input/Input';
import {Button} from '../Button/Button';

import style from './PasswordView.module.scss'

import open from '../../c3-image/photo/open.png'
import close from '../../c3-image/photo/close.png'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const PasswordView = (props: PropsType) => {
    const {
        type,
        ...restProps
    } = props

    const [isOpenPassword, setIsOpenPassword] = useState(false)

    const inputType = isOpenPassword ? 'text' : 'password'

    const onChangeIsOpenStatus = () => {
        setIsOpenPassword(!isOpenPassword)
    }

    return (
        <div className={style.mainComponent}>
            <Input type={inputType}
                   {...restProps}
            />
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
