import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import style from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultButtonPropsType & {
    red?: boolean
    white?:boolean
}

export const Button: FC<PropsType> = (props) => {
    const {
        red, white, className,
        ...restProps
    } =props

    const finalClassName = `${red && style.red} ${white && style.white} ${className? `${style.default} ${className}` : style.default}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    );
};