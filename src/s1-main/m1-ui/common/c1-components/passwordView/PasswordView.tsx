import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';

import {Input} from '../Input/Input';

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
				<div className={style.mainComponent} style={{position: 'relative'}}>
						<Input type={inputType}
						       {...restProps}
						/>
						<span style={{position: 'absolute', right: '0',top:'0'}}
						      className={style.button} onClick={onChangeIsOpenStatus}>
                {
		                isOpenPassword
				                ? <img src={open} alt={'open'} className={style.img}/>
				                : <img src={close} alt={'close'} className={style.img}/>
                }
            </span>
				</div>
		);
};