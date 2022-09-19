import React, {ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';

import {Input} from '../Input/Input';
import {Button} from '../Button/Button';

import style from './PasswordView.module.scss'

import open from '../../c3-image/photo/open.png'
import close from '../../c3-image/photo/close.png'

type  DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultInputPropsType & DefaultButtonPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const PasswordView = (props: PropsType) => {
    const {
        type,
        onChange, onChangeText,
        onKeyUp, onEnter,
        error,
        className, spanClassName,

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
                   onChangeText={onChangeText}
                   onEnter={onEnter}
                   error={error}
                   className={className}
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
