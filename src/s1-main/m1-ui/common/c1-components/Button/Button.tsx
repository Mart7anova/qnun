import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import style from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const Button: FC<PropsType> = (props) => {
    const {
        red, className,
        ...restProps
    } =props

    const finalClassName = `${red && style.red} ${className? className : style.default}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    );
};