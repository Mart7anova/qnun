import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import style from './Input.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const Input: FC<PropsType> = (props) => {
    const {
        type,
        onChange, onChangeText,
        onKeyUp, onEnter,
        error,
        className, spanClassName,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyUpCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyUp && onKeyUp(e);

        onEnter // если есть пропс onEnter
        && e.code === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalInputClassName = `${error && style.errorInput} ${className ? `${style.defaultInput} ${className}` : style.defaultInput}` // need to fix with (?:) and s.superInput
    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`

    return (
        <div className={style.inputContainer}>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyUp={onKeyUpCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    );
};