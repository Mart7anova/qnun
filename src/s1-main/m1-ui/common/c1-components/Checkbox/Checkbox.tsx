import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import style from './Checkbox.module.scss'

type DefaultCheckboxPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultCheckboxPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: FC<PropsType> = (props) => {
    const {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${style.checkbox} ${className ? className : ''}`

    return (
        <label className={style.label}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            <span className={style.box}></span>
            {children && <span className={style.spanClassName}>{children}</span>}
        </label>// благодаря label нажатие на спан передастся в инпут
    );
};
